// menu.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  plazoletas: PlazoletaDTO[] = [];
  selectedPlazoletaId: number= 0; 

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.obtenerPlazoletas();
  }

  obtenerPlazoletas(): void {
    this.http.get<PlazoletaDTO[]>('http://localhost:8090/plazoleta/get-all')
      .subscribe(data => {
        this.plazoletas = data;
      });
  }

  guardarPlazoleta(): void {
    if (this.selectedPlazoletaId) {
      localStorage.setItem('plazoletaId', this.selectedPlazoletaId.toString());
      alert('Plazoleta seleccionada y guardada en el localStorage.');
      this.router.navigate(['/ingreso']);
    } else {
      this.mostrarMensajeError('Error 404', 'Por favor, selecciona una plazoleta');
    }
  }
  private mostrarMensajeError(titulo: string, mensaje: string): void {
    Swal.fire({
      icon: 'error',
      title: titulo,
      text: mensaje,
      timer: 2000, 
      timerProgressBar: true,
    });
  }
}

interface PlazoletaDTO {
  id: number;
  nombre: string;
}


