import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio/inicio.component';
import { IonicModule } from '@ionic/angular';
import { ComprasComponent } from './compras/compras.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [InicioComponent, ComprasComponent],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    FormsModule
  ]
})
export class PagesModule { }
