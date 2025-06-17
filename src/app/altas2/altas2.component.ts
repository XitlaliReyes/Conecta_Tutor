import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-altas2',
  standalone: true,
  imports: [NavbarComponent, FormsModule, CommonModule],
  templateUrl: './altas2.component.html',
  styleUrl: './altas2.component.css'
})
export class Altas2Component{
  nombreCarrera: string = '';
  nombreMateria: string = '';

  constructor(private apiService: ApiService) {}

  agregarCarrera(): void {
    if (this.nombreCarrera) {
      this.apiService.agregarCarrera(this.nombreCarrera).subscribe(
        (response) => {
          alert('Carrera agregada exitosamente');
          this.nombreCarrera = ''; // Limpiar el campo
        },
        (error) => {
          console.error('Error al agregar la carrera:', error);
          const mensaje = error.error?.error || 'Ocurrió un error al agregar la carrera.';
          alert(mensaje);
        }
      );
    }
  }

  agregarMateria(): void {
    if (this.nombreMateria) {
      this.apiService.agregarMateria(this.nombreMateria).subscribe(
        (response) => {
          alert('Materia agregada exitosamente');
          this.nombreMateria = ''; // Limpiar el campo
        },
        (error) => {
          alert('Error al agregar la materia: ' + error.message);
        }
      );
    }
  }
}