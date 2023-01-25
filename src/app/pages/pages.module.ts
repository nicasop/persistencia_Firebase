import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio/inicio.component';
import { IonicModule } from '@ionic/angular';
import { ComprasComponent } from './compras/compras.component';
import { FormsModule } from '@angular/forms';
import { PerfilComponent } from './perfil/perfil.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [InicioComponent, ComprasComponent, PerfilComponent, LoginComponent],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    FormsModule
  ]
})
export class PagesModule { }
