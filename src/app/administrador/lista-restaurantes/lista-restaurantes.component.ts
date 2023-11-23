// lista-restaurantes.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminServiceService} from '../service/admin-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lista-restaurantes',
  templateUrl: './lista-restaurantes.component.html',
  styleUrls: ['./lista-restaurantes.component.css']
})
export class ListaRestaurantesComponent implements OnInit {
  plazoletaId: number = 0;
  plazoletaName: string = "";
  restaurantes: RestauranteDTO[] = [];

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

      // Fetch restaurants for the plazoleta
      this.adminService.getAllRestaurantesByPlazoleta(this.plazoletaId)
        .subscribe(
          (restaurantes: RestauranteDTO[]) => {
            this.restaurantes = restaurantes;
          },
          (error) => {
            console.error('Error fetching restaurantes:', error);
          }
        );
    }
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
  nombre: string;
  codigoSede: string;
  correo: string;
  foto: string;
  comidaFavorita: string;
  id: number;
}
