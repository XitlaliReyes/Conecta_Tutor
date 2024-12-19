import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil-alumno',
  standalone: true,
  imports: [NavbarComponent, CommonModule, RouterModule, FormsModule],
  templateUrl: './perfil-alumno.component.html',
  styleUrls: ['./perfil-alumno.component.css']
})
export class PerfilAlumnoComponent implements OnInit {
  usuarioId: number = 0;  
  asesorias: any[] = [];
  asesoriasAsignadas: any[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    const storedId = sessionStorage.getItem('usuarioId');
    if (storedId) {
      this.usuarioId = +storedId; 
    } else {
      this.router.navigate(['/login']);
      return;
    }

    this.apiService.getAsesorias(this.usuarioId).subscribe(
      (data) => {
        console.log('Datos de asesorías generales: ', data);
        this.asesorias = data;
      },
      (error) => {
        console.error('Error al obtener asesorías generales:', error);
      }
    );

    this.apiService.getAsesoriasUsuario(this.usuarioId).subscribe(
      (data) => {
        console.log('Datos de asesorías asignadas: ', data);
        this.asesoriasAsignadas = data;
      },
      (error) => {
        console.error('Error al obtener asesorías asignadas:', error);
      }
    );
  }

  crearEventosCalendario(): void {
    this.asesoriasAsignadas.forEach((asesoria) => {
      // Crear un nuevo objeto para cada evento
      const datosEvento = {
        dias: asesoria.dias,
        horario_inicio: asesoria.horario_inicio,
        horario_fin: asesoria.horario_fin,
        materiaNombre: asesoria.materiaNombre,
        lugarNombre: asesoria.lugarNombre,
        maestroNombre: asesoria.maestroNombre,
        fecha_inicio: asesoria.fecha_inicio
      };
  
      console.log('Enviando datosEvento:', datosEvento);
  
      // Llamar a la API con el nuevo objeto
      this.apiService.crearEventoCalendario(datosEvento).subscribe(
        (response) => {
          console.log(`Evento creado para asesoría ${asesoria.id_asesoria}:`, response);
          alert(`Evento creado exitosamente`);
        },
        (error) => {
          console.error(`Error al crear evento para asesoría ${asesoria.id_asesoria}:`, error);
          alert('Error al crear evento. Inténtalo nuevamente.');
        }
      );
    });
  }
  
}
