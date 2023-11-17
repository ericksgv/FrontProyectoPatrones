import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-ingreso-cedula',
  templateUrl: './ingreso-cedula.component.html',
  styleUrls: ['./ingreso-cedula.component.css']
})
export class IngresoCedulaComponent {
  userCedula: string = "";

  constructor(private http: HttpClient, private router: Router) { }

  verificarCedula(): void {
    this.http.get('http://localhost:8090/user/get-by-cedula/' + this.userCedula)
      .subscribe(
        (data: any) => {
          localStorage.setItem('userId', data);
          console.log('Usuario encontrado. ID:', data);
          this.router.navigate(['/mostrar-restaurantes']);
        },
        (error) => {
          if (error.status === 404) {
            this.mostrarMensajeError('Error 404', 'Usuario no encontrado.');
          } else {
            this.mostrarMensajeError('Error Inesperado', 'Error inesperado al verificar la cédula.');
          }
        }
      );
  }
  registrarse(): void {
    this.router.navigate(['/registrarse']);
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
