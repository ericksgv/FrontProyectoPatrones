import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturacionService {
  private apiUrl = 'http://localhost:8090';  // Coloca tu URL base aquí

  constructor(private http: HttpClient) {}

  realizarPedido(pedido: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/pedido/create`, pedido);
  }

  enviarDetallePedido(detallePedido: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/detalle-pedido/create`, detallePedido);
  }
}

