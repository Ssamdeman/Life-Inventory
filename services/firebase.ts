
import { initializeApp, FirebaseApp } from 'firebase/app';
import { 
  getAuth, 
  signInAnonymously, 
  onAuthStateChanged, 
  Auth, 
  User 
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  deleteDoc, 
  query, 
  where, 
  onSnapshot, 
  doc, 
  serverTimestamp, 
  orderBy,
  Firestore,
  Unsubscribe
} from 'firebase/firestore';
import { InventoryItem } from '../types';

// This assumes __firebase_config is available globally.
declare const __firebase_config: string;

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;
let firebaseInitializationError: string | null = null;

try {
  const firebaseConfig = JSON.parse(__firebase_config);
  if (!firebaseConfig.apiKey || firebaseConfig.apiKey === 'YOUR_API_KEY') {
    throw new Error('Firebase configuration in `index.html` is using placeholder values.');
  }
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
} catch (e: any) {
  firebaseInitializationError = `Failed to initialize Firebase. Please replace the placeholder values in your index.html file with your actual Firebase project configuration. Original error: ${e.message}`;
  console.error(firebaseInitializationError);
}

export const getInitializationError = () => firebaseInitializationError;

export const authOnStateChanged = (callback: (user: User | null) => void): Unsubscribe => {
  if (!auth) {
    if (!firebaseInitializationError) console.error("Firebase Auth is not initialized.");
    return () => {};
  }
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      callback(user);
    } else {
      signInAnonymously(auth).catch((error) => console.error("Anonymous sign-in error:", error));
    }
  });
};

export const listenToItems = (
  userId: string, 
  categoryId: string, 
  callback: (items: InventoryItem[]) => void
): Unsubscribe => {
  if (!db) {
    if (!firebaseInitializationError) console.error("Firestore is not initialized.");
    return () => {};
  }

  const q = query(
    collection(db, `users/${userId}/inventory`),
    where("categoryId", "==", categoryId),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    const fetchedItems = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as InventoryItem[];
    callback(fetchedItems);
  });
};

export const addItem = async (userId: string, categoryId: string, categoryName: string, itemName: string): Promise<void> => {
  if (!db) {
    const errorMsg = firebaseInitializationError || "Firestore is not initialized.";
    console.error("Cannot add item:", errorMsg);
    return Promise.reject(new Error(errorMsg));
  }
  await addDoc(collection(db, `users/${userId}/inventory`), {
    name: itemName,
    categoryId: categoryId,
    categoryName: categoryName,
    createdAt: serverTimestamp()
  });
};

export const deleteItem = (userId: string, itemId: string): Promise<void> => {
  if (!db) {
    const errorMsg = firebaseInitializationError || "Firestore is not initialized.";
    console.error("Cannot delete item:", errorMsg);
    return Promise.reject(new Error(errorMsg));
  }
  return deleteDoc(doc(db, `users/${userId}/inventory`, itemId));
};
