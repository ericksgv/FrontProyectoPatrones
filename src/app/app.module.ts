import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './plazoleta/menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IngresoCedulaComponent } from './plazoleta/ingreso-cedula/ingreso-cedula.component';
import { RegistroComponent } from './plazoleta/registro/registro.component';
import { MenurestaurantesComponent } from './restaurante/menurestaurantes/menurestaurantes.component';
import { PlatosrestaurantesComponent } from './restaurante/platosrestaurantes/platosrestaurantes.component';
import { FacturaComponent } from './pedido/factura/factura.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuAdminComponent } from './administrador/menu-admin/menu-admin.component';
import { ListaRestaurantesComponent } from './administrador/lista-restaurantes/lista-restaurantes.component';
import { AgregarRestauranteComponent } from './administrador/agregar-restaurante/agregar-restaurante.component';
import { ModificarRestauranteComponent } from './administrador/modificar-restaurante/modificar-restaurante.component';
import { EliminarRestauranteComponent } from './administrador/eliminar-restaurante/eliminar-restaurante.component';
import { IngresoAdminComponent } from './administrador/ingreso-admin/ingreso-admin.component';
import { HistorialPedidosComponent } from './administrador/historial-pedidos/historial-pedidos.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    IngresoCedulaComponent,
    RegistroComponent,
    MenurestaurantesComponent,
    PlatosrestaurantesComponent,
    FacturaComponent,
    MenuAdminComponent,
    ListaRestaurantesComponent,
    AgregarRestauranteComponent,
    ModificarRestauranteComponent,
    EliminarRestauranteComponent,
    IngresoAdminComponent,
    HistorialPedidosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
