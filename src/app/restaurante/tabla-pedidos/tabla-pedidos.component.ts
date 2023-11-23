import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetallePedido } from '../DetallePedido';
import { Observable, interval, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-tabla-pedidos',
  templateUrl: './tabla-pedidos.component.html',
  styleUrls: ['./tabla-pedidos.component.css']
})
export class TablaPedidosComponent implements OnInit {
  httpClient: any;

logout() {
  localStorage.removeItem('idRestauranteActual');
  this.route.navigate(['/login-restaurante']);
}

  pedidos: DetallePedido[] = [];
  total: number = 0;

  marcarComoListo(pedido_id: number) {
    this.http.put(`http://localhost:8090/detalle-pedido/confirm/${pedido_id}`, {})
      .subscribe((response) => {
        this.actualizarListaPedidos();
      }, (error) => {
        console.error('Error al marcar como listo:', error);
      });
  }
  
  private actualizarListaPedidos() {
    this.http.get<DetallePedido[]>(`http://localhost:8090/detalle-pedido/actualizarPedidos/${Number(localStorage.getItem('idRestauranteActual'))}`)
      .subscribe((data) => {
        this.pedidos = data;
        console.log(data)
      });
  }
  

  constructor(
    private route: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.actualizarListaPedidos();

    interval(5000)
      .pipe(
        startWith(0),
        switchMap(() => this.http.get<DetallePedido[]>(`http://localhost:8090/detalle-pedido/actualizarPedidos/${Number(localStorage.getItem('idRestauranteActual'))}`))
      )
      .subscribe((data) => {
        this.pedidos = data;
        console.log('Lista de pedidos actualizada:', data);
      });
  }
}