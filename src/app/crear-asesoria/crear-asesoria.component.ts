import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-asesoria',
  standalone: true,
  imports: [NavbarComponent, FormsModule, CommonModule],
  templateUrl: './crear-asesoria.component.html',
  styleUrl: './crear-asesoria.component.css'
})
export class CrearAsesoriaComponent implements OnInit {
  materias: any[] = [];
  lugares: any[] = [];
  materiasSeleccionadas: number = 0; 
  lugarSeleccionado: number = 0;
  diasSeleccionados: string[] = [];
  horarioInicio: string = '';
  horarioFin: string = '';
  fechaInicio: string = '';
  usuarioId: number = 0;
  horarios: string[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    const storedId = sessionStorage.getItem('usuarioId');
    if (storedId) {
      this.usuarioId = +storedId;  
    }

    // Cargar materias disponibles para el tutor
    this.apiService.getMateria().subscribe(
      (materias) => {
        this.materias = materias;
      },
      (error) => {
        console.error('Error al cargar las materias:', error);
      }
    );

    // Cargar lugares disponibles para el tutor
    this.apiService.getLugar().subscribe(
      (lugares) => {
        this.lugares = lugares;

      },
      (error) => {
        console.error('Error al cargar los lugares:', error);
      }
    );

    this.cargarHorarios();
  }
  cargarHorarios(): void {
    // Generar opciones de horario entre 7:00 AM y 5:00 PM
    for (let i = 7; i <= 17; i++) {
      const hora = i.toString().padStart(2, '0') + ':00';
      this.horarios.push(hora);
    }
  }
  agregarDia(dia: string): void {
    const index = this.diasSeleccionados.indexOf(dia);
    if (index === -1) {
      this.diasSeleccionados.push(dia);
    } else {
      this.diasSeleccionados.splice(index, 1);
    }
  }

  crearAsesoria(): void {
    console.log('Datos a enviar:', {
      materia: this.materiasSeleccionadas,
      lugarSeleccionado: this.lugarSeleccionado,
      diasSeleccionados: this.diasSeleccionados,
    });
  
    if (!this.materiasSeleccionadas) {
      alert('Por favor selecciona una materia.');
      return;
    }
  
    if (!this.diasSeleccionados.length) {
      alert('Por favor selecciona al menos un día.');
      return;
    }
  
    if (!this.fechaInicio) {
      alert('Por favor selecciona un rango de fechas válido.');
      return;
    }
  
    if (!this.horarioInicio ) {
      alert('Por favor selecciona un horario válido.');
      return;
    }
  
    if (!this.lugarSeleccionado) {
      alert('Por favor selecciona un lugar.');
      return;
    }
  
    const asesoria = {
      fecha_inicio: this.fechaInicio,
      // fecha_fin: this.fechaFin,
      dias: this.diasSeleccionados.join(' y '),
      horario_inicio: this.horarioInicio,
      id_materia: Number(this.materiasSeleccionadas), 
      id_lugar: Number(this.lugarSeleccionado),      
      id_maestro: this.usuarioId,
      estado: "En curso",
      id_solicitante: null
    };
  
  
    this.apiService.crearAsesoria(asesoria).subscribe(
      (response) => {
        alert('Asesoría creada exitosamente.');
        this.router.navigate(['/perfil-tutor']);
      },
      (error) => {
        console.error('Error al crear la asesoría:', error);
        alert('Error al crear la asesoría: ' + error.message); 
      }
    );
  }
  
  
}