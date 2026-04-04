import { getApp, getApps, initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

// Server side Firebase Admin configuration
export function getAdminApp() {
  if (getApps().length > 0) return getApp();

  // If we have a service account in environment, use it
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    return initializeApp({
      credential: cert(serviceAccount),
      projectId: "holacxoo",
    });
  }

  // Otherwise, fallback to project ID (this might fail for DB operations without GCP credentials)
  return initializeApp({
    projectId: "holacxoo",
  });
}

export const adminAuth = getAuth(getAdminApp());
export const adminDb = getFirestore(getAdminApp());
