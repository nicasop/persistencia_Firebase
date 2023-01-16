import { Producto } from './producto.models';

export interface Carrito{
    producto:Producto;
    cantidad: number;
}