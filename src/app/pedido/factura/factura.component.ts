import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { FacturacionService } from '../service/facturacion.service';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css'],
})
export class FacturaComponent implements OnInit {
  pedidos: any[] = [];
  total: number = 0;

  constructor(
    private router: Router,
    private http: HttpClient,
    private facturacionService: FacturacionService
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

  eliminarFila(index: number): void {
    this.pedidos.splice(index, 1);
    this.actualizarTotal();
    this.actualizarLocalStorage();
  }

  actualizarTotal(): void {
    this.total = this.pedidos.reduce(
      (sum, pedido) => sum + pedido.subtotalPlato,
      0
    );
  }

  actualizarLocalStorage(): void {
    localStorage.setItem('pedidos', JSON.stringify(this.pedidos));
    localStorage.setItem('total', this.total.toString());
  }

  salir(): void {
    // Eliminar todo el contenido del localStorage
    localStorage.clear();

    // Redireccionar al componente MenuComponent
    this.router.navigate(['/']);
  }

  realizarPago(): void {
    if (this.pedidos.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La lista de pedidos está vacía. Agrega al menos un plato antes de realizar el pago.',
      });
      return;
    }

    const pedido = {
      plazoleta: {
        id: Number(localStorage.getItem('plazoletaId')),
      },
      usuario: {
        id: Number(localStorage.getItem('userId')),
      },
    };

    console.log('PEDIDO', pedido);

    this.facturacionService.realizarPedido(pedido).subscribe({
      next: (response: any) => {
        console.log('Pedido enviado con éxito:', response);

        const detallePedidoObservables = this.pedidos.map((pedido) => {
          const detallePedido = {
            cantidad: pedido.cantidad,
            platoId: pedido.platoId,
            pedidoId: response.id,
          };

          console.log(detallePedido);

          return this.facturacionService.enviarDetallePedido(detallePedido);
        });

        forkJoin(detallePedidoObservables).subscribe({
          next: (detalleResponses: any) => {
            console.log(
              'Detalles de pedido enviados con éxito:',
              detalleResponses
            );

            // Mostrar mensaje de agradecimiento con SweetAlert
            // Mostrar mensaje de agradecimiento con SweetAlert
            Swal.fire({
              icon: 'success',
              title: '¡Gracias por su compra!',
              text: 'Esté pendiente de su correo electrónico para recibir más información sobre su pedido.',
            }).then((result) => {
              // Este código se ejecutará después de que el usuario hace clic en "OK"
              if (result.isConfirmed || result.isDismissed) {
                // Redireccionar a otra página
                // Eliminar todos los elementos del localStorage
                localStorage.clear();
                this.router.navigate(['/']); // Reemplaza '/otra-pagina' con la ruta a la que quieres redirigir
              }
            });
          },
          error: (detalleError) => {
            console.error(
              'Error al enviar los detalles de pedido:',
              detalleError
            );
          },
        });
      },
      error: (error) => {
        console.error('Error al enviar el pedido:', error);
      },
    });
  }
}
