import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingreso-admin',
  templateUrl: './ingreso-admin.component.html',
  styleUrls: ['./ingreso-admin.component.css']
})
export class IngresoAdminComponent implements OnInit{


  plazoletas: PlazoletaDTO[] = [];
  selectedPlazoletaId: number= 0; 

  email: string = "";
  contrasena: string = "";


  constructor(private http: HttpClient, private router: Router){}
  ngOnInit(): void {
    this.obtenerPlazoletas();
  }

  ejecutarAmbasFunciones() {
    //this.guardarPlazoleta();
    this.verificarUsuario();
  }

  //Inicio de sesión 
  verificarUsuario(): void {
    const loginForm = {
      username: this.email,
      password: this.contrasena
    };
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  
    this.http.post('http://localhost:8090/administrador-plazoleta/login', loginForm, { headers, responseType: 'text' })
      .subscribe(
        (response) => {
          console.log('Respuesta exitosa:', response);
          if (response === 'Credenciales incorrectas') {
            this.mostrarMensajeError('Error de inicio de sesión', 'Credenciales incorrectas');
          } else {
            // El inicio de sesión fue exitoso, realiza las acciones necesarias
            this.guardarPlazoleta();
          }
        },
        (error) => {
          console.error('Error en la solicitud:', error);
          this.mostrarMensajeError('Error de inicio de sesión', 'Hubo un problema al intentar iniciar sesión.');
        }
      );
  }
  
  //Plazoletas

  obtenerPlazoletas(): void {
    this.http.get<PlazoletaDTO[]>('http://localhost:8090/plazoleta/get-all')
      .subscribe(data => {
        this.plazoletas = data;
      });
  }
  guardarPlazoleta(): void {
    if (this.selectedPlazoletaId) {
      localStorage.setItem('plazoletaIdAdmin', this.selectedPlazoletaId.toString());
      alert('Plazoleta seleccionada y guardada en el localStorage.');
      this.router.navigate(['/menu-admin']);
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