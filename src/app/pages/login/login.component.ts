import { Component, OnInit } from '@angular/core';
import { FireauthService } from '../../services/fireauth.service';
import { NavController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  email!:string;
  pwd!:string;

  constructor( private auth:FireauthService, private nav: NavController,
               private native: NativeStorage) { }
              

  ngOnInit() {}

  async login(){
    const user = await this.auth.login(this.email,this.pwd)
    console.log(user);
    console.log(user.user?.uid);
    this.auth.setUid(user.user?.uid)
    if(user.user?.uid == "SEa1WCmkI8gUWE5TLErFgvGgG2L2"){

      this.nav.navigateForward('set-producto');
    }
    else {
      this.nav.navigateForward('inicio');
    } 
  }

  registrar(){
    this.nav.navigateForward('perfil')
  }

}
