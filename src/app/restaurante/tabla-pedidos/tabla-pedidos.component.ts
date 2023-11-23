import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetallePedido } from '../DetallePedido';

@Component({
  selector: 'app-tabla-pedidos',
  templateUrl: './tabla-pedidos.component.html',
  styleUrls: ['./tabla-pedidos.component.css']
})
export class TablaPedidosComponent implements OnInit {
logout() {
  localStorage.removeItem('idRestauranteActual');
  this.route.navigate(['/login-restaurante']);
}

  pedidos: DetallePedido[] = [];
  total: number = 0;

  marcarComoListo(pedido_id: number) {
    // Lógica para marcar un pedido como listo, por ejemplo, llamando a la API
    this.http.put(`http://localhost:8090/detalle-pedido/confirm/${pedido_id}`, {})
      .subscribe((response) => {
        // Actualiza la lista de pedidos después de la confirmación
        this.actualizarListaPedidos();
      }, (error) => {
        console.error('Error al marcar como listo:', error);
      });
  }
  
  private actualizarListaPedidos() {
    // Vuelve a cargar la lista de pedidos después de la confirmación
    // Llama a la API para obtener la lista de pedidos
    this.http.get<DetallePedido[]>(`http://localhost:8090/detalle-pedido/actualizarPedidos/${Number(localStorage.getItem('idRestauranteActual'))}`)
      .subscribe((data) => {
        this.pedidos = data;
        console.log(this.pedidos)
      });
  }
  

  constructor(
    private route: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
    // Obtén el restauranteId de los parámetros de la URL

    localStorage.setItem('idRestauranteActual', '5')
    // Llama a la API para obtener la lista de pedidos
    this.http.get<DetallePedido[]>(`http://localhost:8090/detalle-pedido/actualizarPedidos/${Number(localStorage.getItem('idRestauranteActual'))}`)
      .subscribe((data) => {
        this.pedidos = data;
        console.log(this.pedidos)
      });
  }

}
