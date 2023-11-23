import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  private apiUrl = 'http://localhost:8090'; 
  private baseUrl = 'http://localhost:8090/plazoleta';

  constructor(private http: HttpClient) {}

  obtenerPlazoletas(): Observable<PlazoletaDTO[]> {
    const url = `${this.baseUrl}/get-all`;
    return this.http.get<PlazoletaDTO[]>(url);
  }

  // In AdminServiceService
  obtenerNombrePlazoletaPorId(plazoletaId: number): Observable<PlazoletaDTO> {
    const url = `${this.baseUrl}/get/${plazoletaId}`;
    return this.http.get<PlazoletaDTO>(url);
  }

  getAllRestaurantesByPlazoleta(plazoletaId: number): Observable<RestauranteDTO[]> {
    const url = `${this.apiUrl}/restaurante/get-all-by-plazoleta/${plazoletaId}`;
    return this.http.get<RestauranteDTO[]>(url);
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