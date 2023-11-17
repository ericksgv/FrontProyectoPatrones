import { Component, OnInit } from '@angular/core';
import { RestauranteService } from '../service/restaurante.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menurestaurantes',
  templateUrl: './menurestaurantes.component.html',
  styleUrls: ['./menurestaurantes.component.css']
})
export class MenurestaurantesComponent implements OnInit {
  comidas: any[] = []; 
  total: number = 0;
  constructor(
    private restauranteService: RestauranteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const plazoletaId = localStorage.getItem('plazoletaId');
    
    if (plazoletaId) {
      this.restauranteService.obtenerComidas(+plazoletaId).subscribe(
        (data: any[]) => {
          this.comidas = data;
        },
        (error) => {
          console.error('Error al obtener datos de restaurantes', error);
        }
      );
    } else {
      console.error('No se pudo obtener el plazoletaId desde localStorage');
    }
     const storedTotal = localStorage.getItem('total');
     if (storedTotal) {
       this.total = parseFloat(storedTotal);
     }
  }

  seleccionarRestaurante(id: number, foto: string, nombre: string): void {
    localStorage.setItem('restauranteId', id.toString());
    localStorage.setItem('restauranteFoto', foto);
    localStorage.setItem('restauranteNombre', nombre);

    this.router.navigate(['/mostrar-platos']);
  }
}

