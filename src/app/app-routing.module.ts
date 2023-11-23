import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './plazoleta/menu/menu.component';
import { IngresoCedulaComponent } from './plazoleta/ingreso-cedula/ingreso-cedula.component';
import { RegistroComponent } from './plazoleta/registro/registro.component';
import { MenurestaurantesComponent } from './restaurante/menurestaurantes/menurestaurantes.component';
import { PlatosrestaurantesComponent } from './restaurante/platosrestaurantes/platosrestaurantes.component';
import { FacturaComponent } from './pedido/factura/factura.component';
import { MenuAdminComponent } from './administrador/menu-admin/menu-admin.component';
import { ListaRestaurantesComponent } from './administrador/lista-restaurantes/lista-restaurantes.component';
import { EliminarRestauranteComponent } from './administrador/eliminar-restaurante/eliminar-restaurante.component';
import { AgregarRestauranteComponent } from './administrador/agregar-restaurante/agregar-restaurante.component';
import { IngresoAdminComponent } from './administrador/ingreso-admin/ingreso-admin.component';
import { ModificarRestauranteComponent } from './administrador/modificar-restaurante/modificar-restaurante.component';
import { HistorialPedidosComponent } from './administrador/historial-pedidos/historial-pedidos.component';
import { TablaPedidosComponent } from './restaurante/tabla-pedidos/tabla-pedidos.component';
import { LoginComponent } from './restaurante/login/login.component';
import { CentralComponent } from './central/central.component';
const routes: Routes = [
  {
    path: 'login-usuario',
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
  },
  //Componentes Admin
  {
    path : 'menu-admin',
    component : MenuAdminComponent
  },
  {
    path : 'lista-restaurantes',
    component : ListaRestaurantesComponent
  },
  {
    path : 'eliminar-restaurante',
    component : EliminarRestauranteComponent
  },
  {
    path : 'agregarRestaurante', 
    component : AgregarRestauranteComponent
  },
  {
    path : 'modificarRestaurante',
    component : ModificarRestauranteComponent

  },
  {
    path : 'historialPedidosAdmin', 
    component : HistorialPedidosComponent

  },
  {
    path : 'ingresoAdmin',
    component : IngresoAdminComponent
  },
  {
    path : 'pedidos_Restaurante',
    component : TablaPedidosComponent
  },
  {
    path : 'login-restaurante',
    component : LoginComponent
  },
  {
    path : '',
    component : CentralComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
