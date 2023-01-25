import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirestoreBdService } from './firestore-bd.service';
import { Usuarios } from '../models/usuario.models';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FireauthService {

  uid: string | undefined;
  flag:number = 0;

  constructor( public auth: AngularFireAuth, 
               private db:FirestoreBdService,
               private native: NativeStorage,
               private nav: NavController ) {}

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
    this.uid = uid;
    this.setFlag();
  }

  getUid(){
    return this.uid
  }

  setFlag(){
    if (this.uid != undefined){
      if (this.uid == "SEa1WCmkI8gUWE5TLErFgvGgG2L2") {
       this.flag = 1;
      }
      else {
       this.flag = 2;
      }
     }
     else{
       this.flag = 0;
     }
  }

  cerrarSesion(){
    this.logout()
    this.uid = undefined;
    this.flag = 0;
    this.nav.navigateForward('login')
    console.log('servicio');
  }
}
