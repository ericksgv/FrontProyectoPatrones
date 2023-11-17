import { Component, OnInit } from '@angular/core';
import { RestauranteService } from '../service/restaurante.service';
import { Router } from '@angular/router';  

@Component({
  selector: 'app-platosrestaurantes',
  templateUrl: './platosrestaurantes.component.html',
  styleUrls: ['./platosrestaurantes.component.css']
})
export class PlatosrestaurantesComponent implements OnInit {
  platos: any[] = [];
  restaurante: any = {};
  pedidos: InfoPedidoDTO[] = [];
  total: number = 0;

  constructor(
    private restauranteService: RestauranteService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.inicializarPlatos();
    this.inicializarRestaurante();
    this.recuperarPedidosDelLocalStorage();
    this.total = this.calcularTotal();
  }

  private inicializarPlatos(): void {
    const restauranteId = localStorage.getItem('restauranteId');

    if (restauranteId) {
      this.restauranteService.obtenerPlatosPorRestaurante(+restauranteId).subscribe(
        (data: any[]) => {
          this.platos = data.map(plato => ({
            ...plato,
            cantidad: this.obtenerCantidadDesdeLocalStorage(plato.id) || 1
          }));
        },
        (error) => {
          console.error('Error al obtener datos de platos', error);
        }
      );
    } else {
      console.error('No se pudo obtener el restauranteId desde localStorage');
    }
  }

  private inicializarRestaurante(): void {
    const plazoletaId = localStorage.getItem('plazoletaId');

    if (plazoletaId) {
      this.restauranteService.obtenerComidas(+plazoletaId).subscribe(
        (data: any) => {
          this.restaurante = data;
        },
        (error) => {
          console.error('Error al obtener datos del restaurante', error);
        }
      );
    } else {
      console.error('No se pudo obtener el restauranteId desde localStorage');
    }
  }

  private recuperarPedidosDelLocalStorage(): void {
    const storedPedidos = localStorage.getItem('pedidos');
    if (storedPedidos) {
      this.pedidos = JSON.parse(storedPedidos);
    }
  }

  agregarAlPedido(plato: Plato): void {
    const restauranteNombre = localStorage.getItem('restauranteNombre');

    if (restauranteNombre) {
      const pedidoExistente = this.pedidos.find(p => p.platoId === plato.id);

      if (pedidoExistente) {
        pedidoExistente.cantidad = plato.cantidad;
        pedidoExistente.subtotalPlato = plato.precio * pedidoExistente.cantidad;
      } else {
        const nuevoPedido: InfoPedidoDTO = {
          platoId: plato.id,
          nombre: plato.nombre,
          cantidad: plato.cantidad,
          precioPlato: plato.precio,
          subtotalPlato: plato.precio * plato.cantidad,
          pedidoId: 0,
          nombreRestaurante: restauranteNombre,
        };

        this.pedidos.push(nuevoPedido);
      }

      this.total = this.calcularTotal();

      localStorage.setItem('total', this.total.toString());
      this.guardarPedidosEnLocalStorage();

      console.log('Pedidos:', this.pedidos);
      console.log('Total:', this.total);
    } else {
      console.error('No se pudo obtener el nombre del restaurante desde localStorage');
    }
  }

  private obtenerCantidadDesdeLocalStorage(platoId: number): number | null {
    const storedPedidos = localStorage.getItem('pedidos');
    if (storedPedidos) {
      const pedidos: InfoPedidoDTO[] = JSON.parse(storedPedidos);
      const pedidoExistente = pedidos.find(p => p.platoId === platoId);
      return pedidoExistente ? pedidoExistente.cantidad : null;
    }
    return null;
  }

  private guardarPedidosEnLocalStorage(): void {
    localStorage.setItem('pedidos', JSON.stringify(this.pedidos));
  }

  private calcularTotal(): number {
    return this.pedidos.reduce((total, pedido) => total + pedido.subtotalPlato, 0);
  }

  getRestauranteFoto(): string | null {
    return localStorage.getItem('restauranteFoto');
  }

  verLista(): void {
    this.router.navigate(['/factura']);  
  }

}

interface Plato {
  id: number;
  nombre: string;
  cantidad: number;
  precio: number;
}

interface InfoPedidoDTO {
  platoId: number;
  nombre: string;
  cantidad: number;
  precioPlato: number;
  subtotalPlato: number;
  pedidoId: number;
  nombreRestaurante: string;
}

