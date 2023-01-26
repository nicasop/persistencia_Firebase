import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Carrito } from '../models/carrito.models';
import { Producto } from '../models/producto.models';
import { FirestoreBdService } from './firestore-bd.service';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  productos: Carrito[] = [];

  constructor( private nativeStorage:NativeStorage, private db:FirestoreBdService ) { 
    this.getProducts();
   }

  async getProducts(){
    this.productos = await this.nativeStorage.getItem("carrito") || [];
  }

  addProducto( producto:Producto, qty:number ){
    const pos = this.getPosProducto(producto);
    if (pos == -1){
      const nuevo_pro:Carrito = {
        producto: producto,
        cantidad:qty
      }
      this.productos.unshift(nuevo_pro);
      this.nativeStorage.setItem("carrito",this.productos);
    }
    else{
      this.updateProducto(qty,pos)
    }
  }

  updateProducto( qty:number, pos:number ){
    this.productos[pos].cantidad += qty;
    this.nativeStorage.setItem("carrito",this.productos);
  }

  getPosProducto(producto:Producto){
    var pos = -1;
    if (this.productos.length != 0){
       
      for(let i = 0; i < this.productos.length; i++){
        if ( this.productos[i].producto.nombre == producto.nombre){
          pos = i;
          break;
        }
      }
    }
    return pos;
  }

  elimnarProducto(producto:Carrito){
    var indice = this.productos.indexOf(producto);
    this.productos.splice(indice, 1);
    this.nativeStorage.setItem("carrito",this.productos);
  }

  cleanCarrito(){
    this.updateProducts();
    this.productos = [];
    this.nativeStorage.setItem("carrito",this.productos);
  }

  updateProducts(){
    this.productos.forEach( product => {
      let pro = product.producto
      pro.stock = pro.stock - product.cantidad;
      this.db.updateDoc(pro,'productos/',pro.id);
    })
    // let pro;
    // this.db.getDoc<Producto>('productos/',this.productos[0].producto.id).subscribe({
    //   next: res => {
    //     pro = res;
    //   }
    // });
    // console.log(pro);
  }

}
