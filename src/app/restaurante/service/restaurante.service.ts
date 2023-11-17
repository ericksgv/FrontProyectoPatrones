import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestauranteService {
  private apiUrl = 'http://localhost:8090'; 
  private restauranteSeleccionadoId: number = 0;

  constructor(private http: HttpClient) {}

  obtenerComidas(plazoletaId: number): Observable<any[]> {
    const url = `${this.apiUrl}/restaurante/get-all-by-plazoleta/${plazoletaId}`;
    return this.http.get<any[]>(url);
  }

  setRestauranteSeleccionadoId(id: number, foto: string): void {
    this.restauranteSeleccionadoId = id;
    localStorage.setItem('restauranteId', id.toString());
    localStorage.setItem('restauranteFoto', foto);
  }

  getRestauranteSeleccionadoId(): number | null {
    return this.restauranteSeleccionadoId;
  }

  obtenerPlatosPorRestaurante(restauranteId: number): Observable<any[]> {
    const url = `${this.apiUrl}/plato/get-all-by-restaurante/${restauranteId}`;
    return this.http.get<any[]>(url);
  }
}
