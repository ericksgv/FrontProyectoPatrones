import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './plazoleta/menu/menu.component';
import { IngresoCedulaComponent } from './plazoleta/ingreso-cedula/ingreso-cedula.component';
import { RegistroComponent } from './plazoleta/registro/registro.component';
import { MenurestaurantesComponent } from './restaurante/menurestaurantes/menurestaurantes.component';
import { PlatosrestaurantesComponent } from './restaurante/platosrestaurantes/platosrestaurantes.component';
import { FacturaComponent } from './pedido/factura/factura.component';
const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
  },
  {
    path: 'ingreso',
    component: IngresoCedulaComponent,
  },
  {
    path: 'registrarse',
    component: RegistroComponent,
  },
  {
    path: 'mostrar-restaurantes',
    component: MenurestaurantesComponent,
  },
  {
    path: 'mostrar-platos',
    component: PlatosrestaurantesComponent,
  },
  {
    path: 'factura',
    component: FacturaComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
