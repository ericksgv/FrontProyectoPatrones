import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
login() {
  const loginForm = {
    username: this.email,
    password: this.contrasena
  };

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  this.http.post('http://localhost:8090/restaurante/login', loginForm, { headers, responseType: 'text' })
    .subscribe(
      (response) => {
        console.log('Respuesta exitosa:', response);
        if (response === 'Credenciales incorrectas') {
          this.mostrarMensajeError('Error de inicio de sesión', 'Credenciales incorrectas');
        } else {
          // El inicio de sesión fue exitoso, realiza las acciones necesarias
          localStorage.setItem('idRestauranteActual', response)
          this.router.navigate(['/pedidos_Restaurante']);
        }
      },
      (error) => {
        console.error('Error en la solicitud:', error);
        this.mostrarMensajeError('Error de inicio de sesión', 'Hubo un problema al intentar iniciar sesión.');
      }
    );
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

  email: string = "";
  contrasena: string = "";
  restauranteId: number = 0;
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

}
