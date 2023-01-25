import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/app/models/usuario.models';
import { FireauthService } from '../../services/fireauth.service';
import { FirestoreBdService } from '../../services/firestore-bd.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {

  user: Usuarios = {
    nombre: '',
    email: '',
    pwd: '',
    rol: 1
  }

  constructor( public autentication:  FireauthService, 
               private store: FirestoreBdService,
               private native: NativeStorage,
               private nav: NavController) { 
    this.autentication.stateAuth().subscribe({
      next: res => {
        if (res != null){
          this.getInfo(res.uid)
        }
      },
      error: error => {
      }
    });
  }

  async ngOnInit() {
    const uid = await this.autentication.getUID();
    console.log(uid);
    
  }

  async registrar(){
    const res = await this.autentication.registrar(this.user);
    this.native.setItem('user',res)
    this.nav.navigateForward('inicio')
  }

  salir(){
    this.autentication.logout();
  }

  getInfo(uid: string){
    const path = 'usuarios';
    this.store.getDocID<Usuarios>(path,uid).subscribe({
      next: resp => {
        if (resp){
          this.user = resp
        }
      }
    })
  }

}
