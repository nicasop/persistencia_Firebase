import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirestoreBdService } from './firestore-bd.service';
import { Usuarios } from '../models/usuario.models';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class FireauthService {

  uid: string | undefined;

  constructor( public auth: AngularFireAuth, 
               private db:FirestoreBdService,
               private native: NativeStorage ) { }

  login(email:string, pwd: string){
    return this.auth.signInWithEmailAndPassword(email,pwd);
  }

  logout(){
    return this.auth.signOut()
  }

  registrar(user: Usuarios){
    return this.auth.createUserWithEmailAndPassword(user.email,user.pwd);
  }

  async getUID(){
    const user = await this.auth.currentUser;
    if (user === null){
      return null;
    }
    else {
      return user.uid
    }
  }

  stateAuth(){
    return this.auth.authState;
  }

  setUid(uid:string | undefined){
    this.uid = uid
  }
  getUid(){
    return this.uid
  }

}
