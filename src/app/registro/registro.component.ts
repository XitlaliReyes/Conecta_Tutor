import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})

export class RegistroComponent {
  user = {
    id: '',
    nombre: '',
    apellidos: '',
    ocupacion: '',
    password: ''
  };

  errorMessage: string = '';
  successMessage: string = '';  

  constructor(private apiService: ApiService, private router: Router) {}

  onSubmit() {
    this.successMessage = '';
    this.errorMessage = '';
    
    this.apiService.agregarUsuario(this.user).subscribe(
      (response) => {
        console.log('Usuario registrado:', response);
        this.successMessage = 'Registro exitoso. Redirigiendo a inicio de sesión...';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      (error) => {
        console.error('Error al registrar usuario:', error);
        this.errorMessage = `Error: ${error.error.message || 'No se pudo registrar el usuario. Intenta nuevamente.'}`;
      }
    );
  }
}
