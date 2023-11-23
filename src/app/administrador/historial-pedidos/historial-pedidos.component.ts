import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AdminServiceService } from '../service/admin-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historial-pedidos',
  templateUrl: './historial-pedidos.component.html',
  styleUrls: ['./historial-pedidos.component.css']
})
export class HistorialPedidosComponent {

  
  plazoletaId: number = 0;
  plazoletaName: string = "";

  restauranteId : number = 0 ; 

  pedidos: PedidoDTO[] = [];


  constructor(private http: HttpClient, private router: Router, private adminService: AdminServiceService) {}

  ngOnInit(): void {
    this.plazoletaId = +localStorage.getItem("plazoletaIdAdmin")!;
  
    if (this.plazoletaId) {
      // Fetch plazoleta name
      this.adminService.obtenerNombrePlazoletaPorId(this.plazoletaId)
        .subscribe(
          (plazoleta: PlazoletaDTO) => {
            this.plazoletaName = plazoleta.nombre;
          },
          (error) => {
            console.error('Error fetching plazoleta name:', error);
          }
        );
    }

    this.adminService.getAllPedidosByPlazoleta(this.plazoletaId)
    .subscribe(
      (pedidos: PedidoDTO[]) => {
        this.pedidos = pedidos;
        console.log('Pedidos:', this.pedidos);
        // Aquí puedes realizar cualquier otra acción necesaria con los pedidos
      },
      (error) => {
        console.error('Error fetching pedidos:', error);
      }
    );

  }

}

interface PlazoletaDTO {
  id: number;
  nombre: string;
}

interface PedidoDTO {
  id: number;
  total: number;
}



