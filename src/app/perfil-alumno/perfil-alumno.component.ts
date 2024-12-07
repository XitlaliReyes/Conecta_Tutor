/*import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-perfil-alumno',
  standalone: true,
  imports: [NavbarComponent, CommonModule, RouterModule],
  templateUrl: './perfil-alumno.component.html',
  styleUrls: ['./perfil-alumno.component.css']
})
export class PerfilAlumnoComponent implements OnInit {

  usuarioId: number; // ID del usuario almacenado en sesión
  asesorias: any[] = []; // Lista de asesorías enriquecidas
  materias: any[] = []; // Array de materias
  asesoriasEnriquecidas: any[] = []; // Asesorías con nombre de materia agregado
  asesoriaSeleccionada: any = null; // Almacena la asesoría seleccionada

  constructor() {
    const storedId = sessionStorage.getItem('usuarioId') as string; 
    this.usuarioId = storedId ? +storedId : 0;
  constructor(private apiService: ApiService) {
    const storedId = sessionStorage.getItem('usuarioId') as string;
    this.usuarioId = storedId ? +storedId : 0;
  }

  ngOnInit(): void {
    // Obtener las asesorías
    this.apiService.getAsesoria().subscribe(
      (asesorias) => {
        this.asesorias = asesorias;

        // Obtener las materias para completar los datos de las asesorías
        this.apiService.getMaterias().subscribe(
          (materias) => {
            this.materias = materias; // Guardamos el array de materias

            this.asesoriasEnriquecidas = this.asesorias.map(asesoria => {
              const materia = this.materias.find((m: any) => m.id === asesoria.id_materia);
              asesoria.materiaNombre = materia ? materia.nombre : 'Materia desconocida'; 
              return asesoria;
            });
          },
          (error) => {
            console.error('Error al obtener materias:', error);
          }
        );
      },
      (error) => {
        console.error('Error al obtener asesorías:', error);
      }
    );
  }
}*/
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-perfil-alumno',
  standalone: true,
  imports: [NavbarComponent, CommonModule, RouterModule],
  templateUrl: './perfil-alumno.component.html',
  styleUrls: ['./perfil-alumno.component.css']
})
export class PerfilAlumnoComponent implements OnInit {

  usuarioId: number; // ID del usuario almacenado en sesión
  asesorias: any[] = []; // Lista de todas las asesorías disponibles y asignadas
  materias: any[] = []; // Array de materias
  asesoriasAsignadas: any[] = []; // Asesorías asignadas al alumno
  asesoriasEnriquecidas: any[] = []; // Asesorías con nombre de materia agregado
  asesoriaSeleccionada: any = null; // Almacena la asesoría seleccionada

  constructor(private apiService: ApiService) {
    const storedId = sessionStorage.getItem('usuarioId') as string;
    this.usuarioId = storedId ? +storedId : 0;
  }

  ngOnInit(): void {
    // Obtener las asesorías asignadas al alumno
    this.apiService.getAlumnoAsesoria().subscribe(
      (alumnoAsesorias) => {
        // Filtrar las asesorías asignadas al alumno
        const asesoriasAsignadas = alumnoAsesorias
          .filter((asesoria: any) => asesoria.alumnos.includes(this.usuarioId)) // Filtrar por el ID del alumno
          .map((asesoria: any) => asesoria.id_asesoria); // Obtener solo los IDs de las asesorías asignadas
        
        // Obtener todas las asesorías de la API
        this.apiService.getAsesorias().subscribe(
          (asesorias) => {
            // Filtrar solo las asesorías activas
            this.asesorias = asesorias.filter((asesoria: { estado: string; }) => asesoria.estado === 'Activo');

            // Filtrar las asesorías asignadas
            this.asesoriasAsignadas = asesorias.filter((asesoria: { id_asesoria: any; }) =>
              asesoriasAsignadas.includes(asesoria.id_asesoria)
            );

            // Obtener las materias para enriquecer las asesorías
            this.apiService.getMaterias().subscribe(
              (materias) => {
                this.materias = materias; // Guardamos el array de materias

                // Enriquecer las asesorías con el nombre de la materia
                this.asesoriasEnriquecidas = [...this.asesorias, ...this.asesoriasAsignadas].map(asesoria => {
                  const materia = this.materias.find((m: any) => m.id === asesoria.id_materia);
                  asesoria.materiaNombre = materia ? materia.nombre : 'Materia desconocida'; 
                  return asesoria;
                });
              },
              (error) => {
                console.error('Error al obtener las materias:', error);
              }
            );
          },
          (error) => {
            console.error('Error al obtener las asesorías:', error);
          }
        );
      },
      (error) => {
        console.error('Error al obtener las asesorías asignadas al alumno:', error);
      }
    );
  }
}
