import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { MenuController } from '@ionic/angular';
import { Carrito } from '../../models/carrito.models';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.scss'],
})
export class ComprasComponent implements OnInit {

  productos!:Carrito[];
  qty:number = 0;
  total:number = 0;

  constructor(private carrito:CarritoService, 
               private menuCtrl: MenuController) { }

  ngOnInit() {
    this.productos = this.carrito.productos || [];
    // console.log(this.productos);
    // this.calcularCosto()
    // this.actualizar()
  }

  ionViewWillEnter(){
    this.actualizar()
  }
  
  abrir(){
    this.menuCtrl.toggle('principal');
  }

  calcularCosto(){
    this.total = 0;
    this.productos.forEach( val => {
      this.total = this.total + (val.cantidad*val.producto.precio);
    } )

  }

  actualizar(){
    this.productos = this.carrito.productos || [];
    this.calcularCosto()
  }

  comprar(){
    console.log('comprar');
    
  }

}
