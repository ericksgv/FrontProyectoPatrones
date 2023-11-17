import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {
  pedidos: any[] = [];
  total: number = 0;

  constructor(
    private router: Router,
    private http: HttpClient 
  ) {}

  ngOnInit(): void {
    const storedPedidos = localStorage.getItem('pedidos');
    if (storedPedidos) {
      this.pedidos = JSON.parse(storedPedidos);
    }

    const storedTotal = localStorage.getItem('total');
    if (storedTotal) {
      this.total = parseFloat(storedTotal);
    }
  }

  verLista(): void {
    this.router.navigate(['/mostrar-restaurantes']);
  }

  realizarPago(): void {
    const detallesPedido = this.pedidos.map(pedido => ({
      cantidad: pedido.cantidad,
      pedidoId: 7,
      platoId: pedido.platoId
    }));
    console.log(detallesPedido);
    this.http.post('http://localhost:8090/detalle-pedido/create', detallesPedido[0])
      .subscribe(
        (response) => {
          console.log('Pedido realizado con éxito:', response);
        },
        (error) => {
          console.error('Error al realizar el pedido:', error);
        }
      );
  }
}


