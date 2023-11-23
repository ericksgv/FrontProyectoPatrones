import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminServiceService } from '../service/admin-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-eliminar-restaurante',
  templateUrl: './eliminar-restaurante.component.html',
  styleUrls: ['./eliminar-restaurante.component.css']
})
export class EliminarRestauranteComponent {

  plazoletaId: number = 0;
  plazoletaName: string = "";

  restauranteId : number = 0 ; 

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
  }

  onSubmit(): void {
    // Llamada al servicio para eliminar el restaurante
    this.adminService.eliminarRestaurante(this.restauranteId)
      .subscribe(
        (response) => {
          console.log('Restaurante eliminado exitosamente:', response);
          Swal.fire({
            icon: 'success',
            title: 'OK',
            text: 'Restaurante eliminado exitosamente',
          });
          this.router.navigate(['/menu-admin']);
          // Puedes redirigir a otra página o realizar otras acciones después de la eliminación
        },
        (error) => {
          console.error('Error al eliminar el restaurante:', error);
          Swal.fire({
            icon: 'error',
            title: 'error',
            text: 'El restaurante contiene pedidos o no existe',
          });
        }
      );
  }

}


interface PlazoletaDTO {
  id: number;
  nombre: string;
}

