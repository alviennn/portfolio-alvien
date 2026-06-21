import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase/config';

/**
 * Generic Firestore collection service.
 * Used for: projects, certifications, experiences.
 * Keeping this generic avoids duplicating near-identical CRUD code three times.
 */
export function createCollectionService(collectionName) {
  const colRef = collection(db, collectionName);

  async function getAll(orderField = 'createdAt', direction = 'desc') {
    const q = query(colRef, orderBy(orderField, direction));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  }

  async function getById(id) {
    const docRef = doc(db, collectionName, id);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) return null;
    return { id: snapshot.id, ...snapshot.data() };
  }

  async function create(data) {
    const payload = {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    const docRef = await addDoc(colRef, payload);
    return docRef.id;
  }

  async function update(id, data) {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  }

  async function remove(id) {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
  }

  return { getAll, getById, create, update, remove };
}

export const projectsService = createCollectionService('projects');
export const certificationsService = createCollectionService('certifications');
export const experiencesService = createCollectionService('experiences');
