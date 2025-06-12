import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent implements OnInit {
  user = {
    id: null as number | null,
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    ocupacion: '',
    password: '',
    idCarrera: null as number | null,
    semestre: null as number | null,
    nivelAcademico: ''
  };

  errorMessage: string = '';
  successMessage: string = '';
  carreras: any[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {

    this.apiService.getCarrera().subscribe(
      (data) => {
        this.carreras = data;
      },
      (error) => {
        console.error('Error al cargar las carreras:', error);
      }
    );
  }

  onSubmit() {
    this.successMessage = '';
    this.errorMessage = '';

    const { id, nombre, apellidoPaterno, apellidoMaterno, ocupacion, password } = this.user;

    if (!id || !nombre || !apellidoPaterno || !apellidoMaterno || !ocupacion || !password) {
      this.errorMessage = 'Por favor, completa todos los campos obligatorios.';
      return;
    }

    if (ocupacion === 'alumno') {
      if (!this.user.idCarrera || !this.user.semestre) {
        this.errorMessage = 'Debes seleccionar la carrera y el semestre para un alumno.';
        return;
      }
    }

    if (ocupacion === 'tutor') {
      if (!this.user.nivelAcademico) {
        this.errorMessage = 'Debes especificar el nivel académico para un tutor.';
        return;
      }
    }

    this.apiService.agregarUsuario(this.user).subscribe(
      (response) => {
        console.log('Usuario registrado:', response);
        this.successMessage = 'Registro exitoso. Redirigiendo a inicio de sesión...';

        const correo = 'al' + this.user.id + '@edu.uaa.mx';
        const subject = 'Bienvenido a nuestro sistema';
        const text = `Hola ${this.user.nombre},\n\nGracias por registrarte en Conecta Tutor. ¡Bienvenido!`;
        const html = `<p>Hola ${this.user.nombre},</p><p>Gracias por registrarte en Conecta Tutor. ¡Bienvenido!</p>`;

        this.apiService.sendEmail(correo, subject, text, html).subscribe(
          res => console.log('Correo enviado con éxito:', res),
          err => console.error('Error al enviar el correo:', err)
        );

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },
      (error) => {
        console.error('Error al registrar usuario:', error);
        this.errorMessage = `Error: ${error.error?.error || 'No se pudo registrar el usuario. Intenta nuevamente.'}`;
      }
    );
  }
}
