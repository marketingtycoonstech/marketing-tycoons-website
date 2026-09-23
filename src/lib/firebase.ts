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
  initializeFirestore,
  getFirestore,
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
  getDocFromServer,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  where,
  serverTimestamp,
  enableIndexedDbPersistence
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App singleton
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Initialize Firestore with forced long-polling to prevent WebSocket / proxy timeout blocks in sandbox preview iframes
let firestoreInstance: Firestore;
try {
  firestoreInstance = initializeFirestore(
    app,
    {
      experimentalForceLongPolling: true
    },
    firebaseConfig.firestoreDatabaseId || '(default)'
  );
} catch {
  // If already initialized, retrieve existing instance
  firestoreInstance = getFirestore(
    app,
    firebaseConfig.firestoreDatabaseId || '(default)'
  );
}

// Enable local offline persistence for instantaneous local cache reads to prevent boot timeouts
try {
  enableIndexedDbPersistence(firestoreInstance).catch((err) => {
    console.info("Firestore offline persistence operating in memory mode:", err.message);
  });
} catch (e) {
  // Ignore fallback
}

export const db: Firestore = firestoreInstance;
export const auth: Auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Authorized Super Admin Emails (Primary agency owner)
export const AUTHORIZED_ADMIN_EMAILS = [
  'marketingtycoons.tech@gmail.com',
  'marketingtycoons@gmail.com'
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
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
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

// Initial non-blocking connectivity test
async function testFirestoreConnection() {
  try {
    await getDocFromServer(doc(db, 'settings', 'global_settings'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.info("Firestore client operating in resilient offline/cache mode.");
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
    throw error;
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
