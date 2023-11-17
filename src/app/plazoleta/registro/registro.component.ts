import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface UsuarioDTO {
  id: number;
  cedula: number;
  apellido: string;
  correo: string;
  nombre: string;
}

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  usuarioDTO: UsuarioDTO = {
    id: 0,
    cedula: 0,
    apellido: '',
    correo: '',
    nombre: ''
  };

  form: FormGroup;

  constructor(private http: HttpClient,private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      cedula: ['', [Validators.required, Validators.pattern('[0-9]{10}'), Validators.minLength(10), Validators.maxLength(10)]],
      correo: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      id: [0]
    });
  }

  guardarUsuario(): void {
    console.log(this.form.value);
    if (this.form.valid) {
      this.http.post('http://localhost:8090/user/create', this.form.value)
        .subscribe(
          (data: any) => {
            this.mostrarExito('Usuario creado', 'El usuario ha sido creado exitosamente');
            this.router.navigate(['/ingreso']);
          },
          (error) => {
            this.mostrarMensajeError('Error al crear el usuario', 'El usuario ya existe. Por favor, intenta con otro correo');
          }
        );
    } else {
      this.mostrarMensajeError('Error 404', 'El formulario no es válido. Por favor, verifica los campos.');
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
  private mostrarExito(titulo: string, mensaje: string): void {
    Swal.fire({
      icon: 'success',
      title: titulo,
      text: mensaje,
      timer: 2000,
      timerProgressBar: true,
    });
  }
}

