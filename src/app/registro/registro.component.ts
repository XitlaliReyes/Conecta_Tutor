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
  styleUrl: './registro.component.css'
})

export class RegistroComponent implements OnInit {
  user = {
    id: null as number | null,         
    id_carrera: null as number | null,
    nombre: '',
    apellidos: '',
    ocupacion: '',
    password: ''
  };

  errorMessage: string = '';
  successMessage: string = '';  
  carreras: any[] = []; // Para almacenar las carreras

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    // Cargar las carreras cuando el componente se inicializa
    this.apiService.getCarrera().subscribe(
      (data) => {
        this.carreras = data;  // Guardamos las carreras obtenidas
      },
      (error) => {
        console.error('Error al cargar las carreras:', error);
      }
    );
  }

  onSubmit() {
    this.successMessage = '';
    this.errorMessage = '';
    
    // Asegurarse de que ambos id y id_carrera sean números
    this.user.id = +this.user.id!;          // Convertir id a número
    this.user.id_carrera = +this.user.id_carrera!; // Convertir id_carrera a número

    this.apiService.agregarUsuario(this.user).subscribe(
      (response) => {
        console.log('Usuario registrado:', response);
        this.successMessage = 'Registro exitoso. Redirigiendo a inicio de sesión...';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },
      (error) => {
        console.error('Error al registrar usuario:', error);
        this.errorMessage = `Error: ${error.error.message || 'No se pudo registrar el usuario. Intenta nuevamente.'}`;
      }
    );
  }
}
