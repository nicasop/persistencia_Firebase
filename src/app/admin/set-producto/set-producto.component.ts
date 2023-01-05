import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-set-producto',
  templateUrl: './set-producto.component.html',
  styleUrls: ['./set-producto.component.scss'],
})
export class SetProductoComponent implements OnInit {

  nombre!:string;
  precio!:number;
  desc!:number;
  constructor( private menuCtrl: MenuController ) { }

  ngOnInit() {}
  
  abrir(){
    this.menuCtrl.toggle('principal');
  }

  agregar(){}

}
