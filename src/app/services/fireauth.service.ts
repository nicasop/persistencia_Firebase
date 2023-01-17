import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class FireauthService {

  constructor( public auth: AngularFireAuth ) { }

  login(email:string, pwd: string){
    return this.auth.signInWithEmailAndPassword(email,pwd);
  }

  logout(){
    return this.auth.signOut()
  }

  registrar(email: string, pwd:string){
    return this.auth.createUserWithEmailAndPassword(email,pwd);
  }

}
