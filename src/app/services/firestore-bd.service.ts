import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreBdService {

  constructor( private store:AngularFirestore) { }

  crearDoc(data:any, path:string, id:string){
    const collection = this.store.collection(path);
    return collection.doc(id).set(data);
  }

  updateDoc(data:any, path:string, id:string){
    const collection = this.store.collection(path);
    return collection.doc(id).update(data);
  }

  deleteDoc(path:string, id:string){
    const collection = this.store.collection(path);
    return collection.doc(id).delete();
  }

  getCollection<tipo>(path:string){
    const collection = this.store.collection<tipo>(path);
    return collection.valueChanges();
  }

  getID(){
    return this.store.createId();
  }

  getDoc<tipo>(path:string,id:string){
    const doc = this.store.collection<tipo>(path).doc(id);
    return doc.valueChanges();
  }

}
