import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Producto } from 'src/app/models/producto.models';
import { FirestoreBdService } from '../../services/firestore-bd.service';

@Component({
  selector: 'app-set-producto',
  templateUrl: './set-producto.component.html',
  styleUrls: ['./set-producto.component.scss'],
})
export class SetProductoComponent implements OnInit {

  nuevo:boolean = false;
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

  constructor( private menuCtrl: MenuController, private stg:FirestoreBdService ) { }

  ngOnInit() {
    this.obtenerProductos()
  }
  
  abrir(){
    this.menuCtrl.toggle('principal');
  }

  agregar(){
    this.nuevo_producto.id = this.stg.getID();
    this.stg.crearDoc(this.nuevo_producto,this.path,this.nuevo_producto.id)
  }
  nuevo_reg(){
    if(!this.nuevo){
      this.nuevo = true;
    }else{
      this.nuevo = false;
    }
  }

  obtenerProductos(){
    this.stg.getCollection<Producto>(this.path).subscribe(res => {
       this.productosObtenidos = res;
    });
  }

  modificar(){}
  eliminar(){}

}
