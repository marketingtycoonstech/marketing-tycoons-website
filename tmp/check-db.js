const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore/lite');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('/app/applet/firebase-applet-config.json', 'utf8'));

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
  console.log('Querying Firestore collections...');
  try {
    const collections = ['settings', 'portfolio', 'projects'];
    for (const colName of collections) {
      const colRef = collection(db, colName);
      const snapshot = await getDocs(colRef);
      console.log(`\nCollection: ${colName} (${snapshot.size} docs)`);
      snapshot.forEach(doc => {
        console.log(`Doc ID: ${doc.id}`);
        console.log(JSON.stringify(doc.data(), null, 2));
      });
    }
  } catch (e) {
    console.error('Error querying:', e);
  }
  process.exit(0);
}

check();
