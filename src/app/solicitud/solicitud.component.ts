import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Materia {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-solicitud',
  standalone: true,
  imports: [NavbarComponent, CommonModule, RouterModule, FormsModule],
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {
  materias: Materia[] = [];
  materiasSeleccionadas: string[] = [];
  diasSeleccionados: string[] = [];
  horaSeleccionada: string = '';
  asesoriasSolicitadas: any[] = [];  // Aquí se almacenarán las asesorías solicitadas
  usuarioId: number = 0;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Recuperar el ID del usuario desde sessionStorage
    const storedId = sessionStorage.getItem('usuarioId');
    if (storedId) {
      this.usuarioId = +storedId;  // Convertir el ID en número
    }

    // Obtener las materias disponibles
    this.apiService.getMaterias().subscribe(
      (materias) => {
        this.materias = materias;
      },
      (error) => {
        console.error('Error al cargar las materias:', error);
      }
    );

    // Obtener las asesorías solicitadas
    this.apiService.getAsesoriasSolicitadas(this.usuarioId).subscribe(
      (asesorias) => {
        this.asesoriasSolicitadas = asesorias;
      },
      (error) => {
        console.error('Error al obtener las asesorías solicitadas:', error);
      }
    );
  }

  agregarDia(dia: string): void {
    const index = this.diasSeleccionados.indexOf(dia);
    if (index === -1) {
      this.diasSeleccionados.push(dia);
    } else {
      this.diasSeleccionados.splice(index, 1);
    }
  }

  enviarSolicitud(): void {
    if (!this.materiasSeleccionadas.length) {
      alert('Por favor selecciona al menos una materia.');
      return;
    }

    if (this.diasSeleccionados.length === 0) {
      alert('Por favor selecciona al menos un día.');
      return;
    }

    if (!this.horaSeleccionada) {
      alert('Por favor selecciona una hora.');
      return;
    }

    // Combina los días seleccionados en una cadena separada por "y"
    const diasString = this.diasSeleccionados.join(' y ');

    const solicitud = {
      dias: diasString,
      horario_inicio: this.horaSeleccionada,
      materia: this.materiasSeleccionadas.join(', '),
      id_solicitante: this.usuarioId  // Incluir el ID del usuario
    };

    // Enviar solicitud de asesoría
    this.apiService.enviarSolicitud(solicitud).subscribe(
      (response) => {
        alert('Solicitud enviada exitosamente.');
        // Recargar las asesorías solicitadas después de enviar la solicitud
        this.apiService.getAsesoriasSolicitadas(this.usuarioId).subscribe(
          (asesorias) => {
            this.asesoriasSolicitadas = asesorias;
          },
          (error) => {
            console.error('Error al obtener las asesorías solicitadas:', error);
          }
        );
      },
      (error) => {
        console.error('Error al enviar la solicitud:', error);
      }
    );
  }

  cancelarAsesoria(id: number): void {
    console.log('Intentando cancelar la asesoría con id:', id);  // Para asegurarte de que el id es correcto
  
    // Enviar el objeto con la forma correcta: { idAsesoria: id }
    this.apiService.cancelarAsesoria({ idAsesoria: id }).subscribe(
      (response) => {
        alert('Asesoría cancelada exitosamente.');
      },
      (error) => {
        console.error('Error al cancelar la asesoría:', error);
      }
    );
  }
  
  
}
