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
  const collectionRef = collection(db, collectionName);

  return {
    async getAll() {
      const q = query(collectionRef, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);

      return snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
    },

    async getById(id) {
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
      return addDoc(collectionRef, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    },

    async update(id, data) {
      const documentRef = doc(db, collectionName, id);

      return updateDoc(documentRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    },

    async remove(id) {
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