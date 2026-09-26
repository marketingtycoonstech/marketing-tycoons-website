const { initializeApp } = require('firebase/app');
const { getFirestore, doc, getDoc } = require('firebase/firestore/lite');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));

const firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  appId: config.appId,
  storageBucket: config.storageBucket
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, config.firestoreDatabaseId || '(default)');

async function check() {
  console.log('Querying specific global_settings doc...');
  try {
    const docRef = doc(db, 'settings', 'global_settings');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log('Settings Data:', JSON.stringify(docSnap.data(), null, 2));
    } else {
      console.log('No global_settings document exists!');
    }
  } catch (e) {
    console.error('Error querying:', e);
  }
  process.exit(0);
}

check();
