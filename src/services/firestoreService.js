import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";

function createFirestoreService(collectionName) {
  return {
    async getAll() {
      if (!db) return [];
      const collectionRef = collection(db, collectionName);
      const q = query(collectionRef, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);

      return snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
    },

    async getById(id) {
      if (!db) return null;
      const documentRef = doc(db, collectionName, id);
      const snapshot = await getDoc(documentRef);

      if (!snapshot.exists()) {
        return null;
      }

      return {
        id: snapshot.id,
        ...snapshot.data(),
      };
    },

    async create(data) {
      if (!db) throw new Error("Firestore is not configured (.env missing).");
      const collectionRef = collection(db, collectionName);
      return addDoc(collectionRef, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    },

    async update(id, data) {
      if (!db) throw new Error("Firestore is not configured (.env missing).");
      const documentRef = doc(db, collectionName, id);

      return updateDoc(documentRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    },

    async remove(id) {
      if (!db) throw new Error("Firestore is not configured (.env missing).");
      const documentRef = doc(db, collectionName, id);

      return deleteDoc(documentRef);
    },
  };
}

export const projectsService = createFirestoreService("projects");
export const certificationsService = createFirestoreService("certifications");
export const experiencesService = createFirestoreService("experiences");
export const skillsService = createFirestoreService("skills");

export const contactService = {
  async get() {
    if (!db) return null;
    const ref = doc(db, "siteSettings", "contact");
    const snapshot = await getDoc(ref);

    if (!snapshot.exists()) {
      return null;
    }

    return {
      id: snapshot.id,
      ...snapshot.data(),
    };
  },

  async update(data) {
    if (!db) throw new Error("Firestore is not configured (.env missing).");
    const ref = doc(db, "siteSettings", "contact");

    return setDoc(
      ref,
      {
        ...data,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  },
};
