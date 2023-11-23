import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminServiceService } from '../service/admin-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-restaurante',
  templateUrl: './modificar-restaurante.component.html',
  styleUrls: ['./modificar-restaurante.component.css']
})
export class ModificarRestauranteComponent {
  plazoletaId: number = 0;
  plazoletaName: string = "";


  // Restaurante
  restauranteId: number = 0;
  restauranteNombre: string = "";
  restauranteCorreo: string = "";
  restauranteLogo: string = "";
  restauranteComidaFavorita: string = "";
  restauranteCodigoSede : string ="";


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
    // Crear un objeto con los datos del restaurante
    if (!this.restauranteId! || !this.restauranteNombre || !this.restauranteCodigoSede || !this.restauranteCorreo || !this.restauranteLogo || !this.restauranteComidaFavorita) {
      Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Por favor, complete todos los campos antes de enviar el formulario',
      });
      return; // Detiene la ejecución si algún campo no está lleno
    }
    const restaurante = {
      codigoSede: this.restauranteCodigoSede,
      contrasena: "1234",
      correo: this.restauranteCorreo,
      nombre: this.restauranteNombre,
      foto: this.restauranteLogo,
      comidaFavorita: this.restauranteComidaFavorita,
      plazoleta:{
        id: this.plazoletaId
      }
    }

    console.log(restaurante)
    // Llamar al servicio para crear el restaurante
    this.adminService.updateRestaurante(this.restauranteId,restaurante)
      .subscribe(
        (response) => {
          console.log('Restaurante modificado exitosamente:', response);
          Swal.fire({
            icon: 'success',
            title: 'OK',
            text: 'Restaurante modificado exitosamente',
          });
          //Redirigir a otra página
          this.router.navigate(['/menu-admin']);
          // Puedes redirigir a otra página o realizar otras acciones después de la creación
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al modificar el restaurante',
          });
          console.error('Error al modificar el restaurante:', error);
        }
      );
  }
  volver() {
    this.router.navigate(['/menu-admin']);
  }
}

interface PlazoletaDTO {
  id: number;
  nombre: string;
}

interface RestauranteDTO {
  id: number;
  codigo_sede: string;
  comida_favorita: string;
  contrasena : string;
  correo: string;
  foto: string;
  nombre: string;
  plazoleta_id : number;
}

