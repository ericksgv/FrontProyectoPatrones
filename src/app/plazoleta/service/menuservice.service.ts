import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MenuserviceService {

  private baseUrl = 'http://localhost:8090/plazoleta';

  constructor(private http: HttpClient) { }

  obtenerPlazoletas(): Observable<PlazoletaDTO[]> {
    const url = `${this.baseUrl}/get-all`;
    return this.http.get<PlazoletaDTO[]>(url);
  }
}

interface PlazoletaDTO {
  id: number;
  nombre: string;
}