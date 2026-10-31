import admin from 'firebase-admin';
import fs from 'fs';
import { env } from './env.js';
import { logger } from '../utils/logger.js';

let firebaseInitialized = false;

export function initializeFirebaseAdmin(): admin.app.App {
  if (firebaseInitialized && admin.apps.length > 0) {
    return admin.app();
  }

  try {
    if (env.FIREBASE_SERVICE_ACCOUNT_PATH && fs.existsSync(env.FIREBASE_SERVICE_ACCOUNT_PATH)) {
      const serviceAccount = JSON.parse(fs.readFileSync(env.FIREBASE_SERVICE_ACCOUNT_PATH, 'utf-8'));
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: env.FIREBASE_PROJECT_ID
      });
      logger.info('Firebase Admin initialized via service account file');
    } else if (env.FIREBASE_CLIENT_EMAIL && env.FIREBASE_PRIVATE_KEY) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: env.FIREBASE_PROJECT_ID,
          clientEmail: env.FIREBASE_CLIENT_EMAIL,
          privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
        }),
        projectId: env.FIREBASE_PROJECT_ID
      });
      logger.info('Firebase Admin initialized via environment credentials');
    } else {
      admin.initializeApp({
        projectId: env.FIREBASE_PROJECT_ID
      });
      logger.info({ projectId: env.FIREBASE_PROJECT_ID }, 'Firebase Admin initialized with default project credentials');
    }

    firebaseInitialized = true;
    return admin.app();
  } catch (error) {
    logger.error({ error }, 'Failed to initialize Firebase Admin SDK');
    throw error;
  }
}

export const firebaseAdmin = admin;
export const firebaseAuth = () => {
  if (!firebaseInitialized) {
    initializeFirebaseAdmin();
  }
  return admin.auth();
};

