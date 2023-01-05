import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {

  constructor( private menuCtrl: MenuController ) { }

  ngOnInit() {}

  abrir(){
    this.menuCtrl.toggle('principal');
  }

}
