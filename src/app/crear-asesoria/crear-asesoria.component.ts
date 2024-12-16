import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';

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
  fechaFin: string = '';
  usuarioId: number = 0;


  constructor(private apiService: ApiService) {}

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
  
    if (!this.fechaInicio || !this.fechaFin) {
      alert('Por favor selecciona un rango de fechas válido.');
      return;
    }
  
    if (!this.horarioInicio || !this.horarioFin) {
      alert('Por favor selecciona un horario válido.');
      return;
    }
  
    if (!this.lugarSeleccionado) {
      alert('Por favor selecciona un lugar.');
      return;
    }
  
    // Ya no necesitas buscar la materia y lugar con find()
    const asesoria = {
      fecha_inicio: this.fechaInicio,
      fecha_fin: this.fechaFin,
      dias: this.diasSeleccionados.join(' y '),
      horario_inicio: this.horarioInicio,
      horario_fin: this.horarioFin,
      id_materia: Number(this.materiasSeleccionadas), // Convertir el string a número
      id_lugar: Number(this.lugarSeleccionado),       // Convertir el string a número
      id_maestro: this.usuarioId,
      estado: "Activo",
      id_solicitante: null
    };
  
    console.log('Objeto asesoria a enviar:', asesoria); // Para debugging
  
    this.apiService.crearAsesoria(asesoria).subscribe(
      (response) => {
        alert('Asesoría creada exitosamente.');
      },
      (error) => {
        console.error('Error al crear la asesoría:', error);
        alert('Error al crear la asesoría: ' + error.message); // Mostrar el error específico
      }
    );
  }
  
  
}