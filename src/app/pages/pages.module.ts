import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio/inicio.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [InicioComponent],
  imports: [
    CommonModule,
    IonicModule.forRoot()
  ]
})
export class PagesModule { }
