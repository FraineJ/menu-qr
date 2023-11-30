import { Injectable } from '@angular/core';
import {
  DocumentData,
  DocumentReference,
  Firestore,
  QueryDocumentSnapshot,
  addDoc,
  collection,
  doc,
  endBefore,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { environment } from 'src/environment/environment.dev';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private firestore: Firestore) {}

  async createOrder(order: any): Promise<DocumentReference<DocumentData>> {
    const shopInfoRef = collection(this.firestore, environment.nameCollection);
    const data = { order };
    return addDoc(shopInfoRef, data);
  }

  async saveInfoPayment(
    infoPayment: any
  ): Promise<DocumentReference<DocumentData>> {
    const shopInfoRef = collection(
      this.firestore,
      environment.nameCollectionPayment
    );
    const data = { infoPayment };
    return addDoc(shopInfoRef, data);
  }

  async getProducts(): Promise<any> {
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);

    const productInfoRef = query(
      collection(this.firestore, environment.nameCollection),
      where('createdAt', '>', startDate),
      orderBy('createdAt', 'desc')
    );

    const docsSnapshot = await getDocs(productInfoRef);
    const responseData: DocumentData[] = [];
    docsSnapshot.forEach(async (document) => {
      responseData.push({ uuid: document.id, ...document.data() });
    });
    return responseData;
  }
}
