import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { MenuController, AlertController, ToastController, NavController } from '@ionic/angular';
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
               private menuCtrl: MenuController,
               private alert: AlertController,
               private toast: ToastController,
               private nav: NavController) { }

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
    if (this.productos.length != 0){
      this.total = 0;
      this.productos.forEach( val => {
        this.total = this.total + (val.cantidad*val.producto.precio);
      })
    }
  }

  actualizar(){
    this.productos = this.carrito.productos || [];
    this.calcularCosto()
  }

  comprar(){
    if (this.productos.length != 0){
      this.alertComprar();
    }
    else{
      this.presentToast('No tiene elementos en el carrito para comprar')
    }
  }

  async alertComprar() {
    const alert = await this.alert.create({
      header: 'COMPRA',
      message: 'Esta seguro que desea realizar la compra',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
          },
        },
        {
          text: 'Si',
          role: 'confirm',
          handler: () => {
            this.carrito.cleanCarrito();
            this.nav.navigateForward("/inicio");
          },
        },
      ],
    });

    await alert.present();
  }

  async presentToast(msg:string) {
    const toast = await this.toast.create({
      message: msg,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }

  eliminarProducto(producto:Carrito){
    this.carrito.elimnarProducto(producto);
    this.actualizar();
  }

}
