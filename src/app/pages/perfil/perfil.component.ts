import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/app/models/usuario.models';
import { FireauthService } from '../../services/fireauth.service';
import { FirestoreBdService } from '../../services/firestore-bd.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {

  user: Usuarios = {
    nombre: '',
    email: '',
    pwd: ''
  }

  constructor( public autentication:  FireauthService, private store: FirestoreBdService) { 
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
    const res = await this.autentication.registrar(this.user.email, this.user.pwd);
    console.log(res);
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
