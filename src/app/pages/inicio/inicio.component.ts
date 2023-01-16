import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController, NavController, ToastController } from '@ionic/angular';
import { Producto } from 'src/app/models/producto.models';
import { FirestoreBdService } from '../../services/firestore-bd.service';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
  path:string = 'productos/'
  productos: Producto[] = [];

  constructor( private menuCtrl: MenuController, private stg:FirestoreBdService,
              private alertController: AlertController,
              private toast: ToastController,
              private carrito: CarritoService,
              private nav: NavController
              ) { }

  ngOnInit() {
    this.obtenerProductos();
  }

  abrir(){
    this.menuCtrl.toggle('principal');
  }

  verCompras(){
    this.nav.navigateForward('carrito')
  }

  obtenerProductos(){
    this.stg.getCollection<Producto>(this.path).subscribe( res => {
      this.productos = res;
    })
  }

  async shopAlert(producto:Producto) {
    const alert = await this.alertController.create({
      header: '¿Desea comprar el producto '+ producto.nombre +'?',
      inputs: [
        {
          name:'qty',
          type: 'number',
          placeholder: 'Cantidad',
          min: 1,
          max: producto.stock,
          value:1
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            
          },
        },
        {
          text: 'Comprar',
          role: 'confirm',
          handler: () => {
            alert.onWillDismiss().then( res => {
              const qty = res.data.values.qty;
              if( qty != 0 && qty <= Number(producto.stock) ){
                this.carrito.addProducto( producto, qty );

              }else{
                this.presentToast('La cantidad que desea comprar no esta disponible')
              }
            });
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

}
