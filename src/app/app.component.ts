import { Component, OnInit } from '@angular/core';
import { FireauthService } from './services/fireauth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent{
  uid: string | undefined;
  // flag!: number;
  constructor( public auth: FireauthService,
               private nav: NavController) {
  }
}
