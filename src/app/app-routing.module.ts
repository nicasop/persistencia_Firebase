import { NgModule, Component } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SetProductoComponent } from './admin/set-producto/set-producto.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ComprasComponent } from './pages/compras/compras.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path:'inicio',
    component: InicioComponent
  },
  {
    path:'set-producto',
    component: SetProductoComponent
  },
  {
    path:'carrito',
    component: ComprasComponent
  },
  {
    path:'perfil',
    component: PerfilComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
      path: '',
      redirectTo: 'inicio',
      pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
