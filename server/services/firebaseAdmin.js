const admin = require('firebase-admin');
const path = require('path');

// Initialize Firebase Admin SDK
// Supports three modes:
// 1. FIREBASE_SERVICE_ACCOUNT_JSON  — full JSON string (Render-friendly)
// 2. FIREBASE_SERVICE_ACCOUNT_BASE64 — base64-encoded JSON (Render secret files)
// 3. FIREBASE_ADMIN_SDK_PATH         — path to JSON file (local dev)

function loadServiceAccount() {
  // Mode 1: Full JSON string
  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
  }

  // Mode 2: Base64-encoded JSON (for Render secret files or single-line env)
  if (process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
    const decoded = Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, 'base64').toString('utf-8');
    return JSON.parse(decoded);
  }

  // Mode 3: Path to local JSON file
  const filePath = process.env.FIREBASE_ADMIN_SDK_PATH
    || path.join(__dirname, '..', '..', 'learn-japanese-e60e8-firebase-adminsdk-fbsvc-eef3889a6b.json');
  return require(path.resolve(filePath));
}

try {
  const serviceAccount = loadServiceAccount();

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
  });

  console.log('Firebase Admin initialized for project:', serviceAccount.project_id);
} catch (error) {
  console.warn('Firebase Admin initialization skipped:', error.message);
}

const db = admin.firestore?.();

module.exports = { admin, db };
