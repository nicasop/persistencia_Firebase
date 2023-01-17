import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { Producto } from 'src/app/models/producto.models';
import { FirestoreBdService } from '../../services/firestore-bd.service';
import { FirestorageService } from '../../services/firestorage.service';

@Component({
  selector: 'app-set-producto',
  templateUrl: './set-producto.component.html',
  styleUrls: ['./set-producto.component.scss'],
})
export class SetProductoComponent implements OnInit {

  nuevo:boolean = false;
  nuevo_button: boolean = false;
  nuevo_producto: Producto = {
    id: "",
    nombre: "",
    precio: 0.0,
    stock: 0,
    image: "",
    fecha: new Date()
  };
  path:string = 'productos/'
  productosObtenidos: Producto[] = [];
  image:string = "";

  constructor( private menuCtrl: MenuController, 
                private stg:FirestoreBdService,
                private loading: LoadingController,
                private toast: ToastController,
                private alert: AlertController,
                private storage: FirestorageService 
              ) { }
              
  ngOnInit() {
    this.obtenerProductos()
  }
  
  abrir(){
    this.menuCtrl.toggle('principal');
  }

  nuevo_reg(){
    this.nuevo = true;
    this.nuevo_button = true;
    this.nuevo_producto = {
      id: "",
      nombre: "",
      precio: 0.0,
      stock: 0,
      image: "",
      fecha: new Date()
    };
    this.image = ""
  }

  agregar(){
    this.showLoading('Guardando Producto...');
    this.nuevo_producto.id = this.stg.getID();
    this.stg.crearDoc(this.nuevo_producto,this.path,this.nuevo_producto.id).then(res => {
      this.loading.dismiss();
      this.presentToast('Producto Guardado Exitosamente')
      this.nuevo = false
    }).catch( error => {
      this.loading.dismiss();
      this.presentToast('El Producto no pudo ser guardado')
    })
  }

  modificar(){
    this.showLoading('Actualizando Producto...');
    this.stg.updateDoc(this.nuevo_producto,this.path,this.nuevo_producto.id).then( res => {
      this.loading.dismiss();
      this.presentToast('Producto Actualizado Exitosamente')
      this.nuevo = false
    }).catch( error => {
      this.loading.dismiss();
      this.presentToast('El Producto no pudo ser actualizado')
    })
  }

  obtenerProductos(){
    this.stg.getCollection<Producto>(this.path).subscribe(res => {
       this.productosObtenidos = res;
    });
  }

  async showLoading(msg:string) {
    const loading = await this.loading.create({
      message: msg,
      spinner: 'bubbles',
    });

    loading.present();
  }

  async presentToast(msg:string) {
    const toast = await this.toast.create({
      message: msg,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }

  async eliminarProducto(producto: Producto) {
    const alert = await this.alert.create({
      header: 'Advertencia',
      message: 'Esta seguro que desea <strong>eliminar</strong> el producto: '+producto.nombre,
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
            this.stg.deleteDoc(this.path,producto.id).then( res => {
              this.presentToast('Producto Eliminado');
            }).catch( err => {
              this.presentToast('El producto no ha sido eliminado')
            })
          },
        },
      ],
    });

    await alert.present();
  }

  async uploadImage( event:any ){
    const path = "Productos";
    const name = this.nuevo_producto.nombre
    const file = event.target.files[0];
    const res = await this.storage.uploadImage(file,path,name);
    this.nuevo_producto.image = res;
    this.image = res
    console.log(res);
  }

}
