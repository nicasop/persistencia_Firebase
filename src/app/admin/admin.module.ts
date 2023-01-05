import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetProductoComponent } from './set-producto/set-producto.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [SetProductoComponent],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    FormsModule
  ]
})
export class AdminModule { }
