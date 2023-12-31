import admin from 'firebase-admin';
require('dotenv').config()

const serviceAccountKeyPath = process.env.SERVICE_ACCOUNT_KEY_PATH;

console.log('serviceAccountKeyPath', serviceAccountKeyPath);
if (!serviceAccountKeyPath) {
  throw new Error('SERVICE_ACCOUNT_KEY_PATH is not defined in the environment variables');
}

const serviceAccount: any = require(serviceAccountKeyPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
