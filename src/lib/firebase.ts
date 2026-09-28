import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  Auth
} from 'firebase/auth';
import {
  getFirestore,
  initializeFirestore,
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  where,
  serverTimestamp
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App singleton
export const app: FirebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

// Initialize Firestore with autoDetectLongPolling for seamless reliability in web/iframe sandbox environments
let firestoreInstance: Firestore;
try {
  firestoreInstance = initializeFirestore(app, {
    experimentalAutoDetectLongPolling: true,
  }, firebaseConfig.firestoreDatabaseId);
} catch {
  // If already initialized, retrieve existing instance
  firestoreInstance = getFirestore(app, firebaseConfig.firestoreDatabaseId);
}
export const db: Firestore = firestoreInstance;

export const auth: Auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Authorized Super Admin Emails (Primary agency owner)
export const AUTHORIZED_ADMIN_EMAILS = [
  'marketingtycoons.tech@gmail.com'
];

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errMsg = error instanceof Error ? error.message : String(error);
  const errCode = (error as { code?: string })?.code;

  // Handle transient offline / unavailable states gracefully as Firestore operates in offline mode
  if (errCode === 'unavailable' || errMsg.includes('offline') || errMsg.includes('Could not reach Cloud Firestore')) {
    console.info(`[Firestore Status] Backend in offline cache mode for '${path}'. Updates will sync automatically when connected.`);
    return {
      error: 'Backend operating in offline mode. Local cache active.',
      operationType,
      path,
      authInfo: {
        userId: auth.currentUser?.uid || null,
        email: auth.currentUser?.email || null,
      }
    };
  }

  const errInfo: FirestoreErrorInfo = {
    error: errMsg,
    authInfo: {
      userId: auth.currentUser?.uid || null,
      email: auth.currentUser?.email || null,
      emailVerified: auth.currentUser?.emailVerified || null,
      isAnonymous: auth.currentUser?.isAnonymous || null,
      tenantId: auth.currentUser?.tenantId || null,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.warn(`[Firestore Safe Handler] Operation '${operationType}' on path '${path}':`, errInfo.error);
  return errInfo;
}

// Initial non-blocking connectivity check with graceful offline support
async function testFirestoreConnection() {
  try {
    await getDoc(doc(db, 'test', 'connection'));
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    if (msg.includes('offline') || (error as { code?: string })?.code === 'unavailable') {
      console.info("[Firestore Status] Initialized in offline-tolerant mode.");
    }
  }
}
testFirestoreConnection();

/**
 * Sign in with Google legal authentication via Firebase Auth
 */
export async function signInWithGoogle(): Promise<{
  user: FirebaseUser;
  isAdmin: boolean;
}> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Check if user is an authorized admin
    const email = (user.email || '').toLowerCase().trim();
    const isAdmin = AUTHORIZED_ADMIN_EMAILS.includes(email);

    // Record user profile in Firestore
    try {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(
        userRef,
        {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || 'Client User',
          photoURL: user.photoURL || '',
          role: isAdmin ? 'Super Admin' : 'Client',
          lastLoginAt: serverTimestamp(),
          isGoogleVerified: true
        },
        { merge: true }
      );
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, `users/${user.uid}`);
    }

    return { user, isAdmin };
  } catch (error: any) {
    console.error('Google Sign-in failed:', error);
    
    let friendlyMessage = error?.message || String(error);
    const code = error?.code;
    const hostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
    
    if (code === 'auth/unauthorized-domain') {
      friendlyMessage = `Unauthorized Domain: Please add '${hostname}' to your Firebase console (Authentication > Settings > Authorized Domains). Copy this domain and allow it in Firebase console to enable secure login.`;
    } else if (code === 'auth/popup-blocked') {
      friendlyMessage = 'Popup Blocked: Your browser blocked the Google login window. Please enable popups for this site (look for the popup blocker icon in your browser address bar) and try again.';
    } else if (code === 'auth/web-storage-unsupported') {
      friendlyMessage = 'Web Storage Unsupported: Google login cannot be completed inside a restricted iframe. Please open the application directly in a full browser tab or enable third-party cookies.';
    } else if (code === 'auth/cancelled-popup-request') {
      friendlyMessage = 'Sign-in cancelled: The authentication window was closed before completion. Please try again.';
    }
    
    const enrichedError = new Error(friendlyMessage);
    (enrichedError as any).code = code;
    (enrichedError as any).originalError = error;
    throw enrichedError;
  }
}

/**
 * Log out currently authenticated user
 */
export async function logoutUser(): Promise<void> {
  await signOut(auth);
}

export {
  onAuthStateChanged,
  type FirebaseUser,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  where,
  serverTimestamp
};
