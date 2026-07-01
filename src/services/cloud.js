import { FIREBASE_CONFIG, FIRESTORE_ROOT, FIRESTORE_COLLECTION } from '../constants/defaults.js';

export function cloudOn(cloudGroup) {
  return Boolean(FIREBASE_CONFIG.projectId && FIREBASE_CONFIG.apiKey && cloudGroup.id);
}

export function firestoreBase() {
  return `https://firestore.googleapis.com/v1/projects/${FIREBASE_CONFIG.projectId}/databases/(default)/documents`;
}

export async function fetchFirestore(path, options = {}) {
  const url = `${firestoreBase()}/${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": FIREBASE_CONFIG.apiKey,
      ...options.headers,
    },
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error?.message || "Firestore error");
  }
  return res.json();
}
