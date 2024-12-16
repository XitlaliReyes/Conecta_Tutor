import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-altas',
  standalone: true,
  imports: [NavbarComponent, FormsModule, CommonModule],
  templateUrl: './altas.component.html',
  styleUrls: ['./altas.component.css']
})
export class AltasComponent implements OnInit {
  idCarreraSeleccionada: number | null = null; // ID de la carrera seleccionada
  materiasSeleccionadas: any[] = []; // Arreglo para guardar los ID de las materias seleccionadas
  materias: any[] = []; // Arreglo de materias cargadas desde la API
  carreras: any[] = []; // Arreglo de carreras cargadas desde la API

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    // Cargar carreras disponibles
    this.apiService.getCarrera().subscribe(
      (carreras) => {
        this.carreras = carreras;
      },
      (error) => {
        console.error('Error al cargar las carreras:', error);
      }
    );

    // Cargar materias disponibles
    this.apiService.getMateria().subscribe(
      (materias) => {
        this.materias = materias;
        this.materias.forEach(materia => {
          materia.seleccionada = false; // Al principio ninguna materia está seleccionada
        });
      },
      (error) => {
        console.error('Error al cargar las materias:', error);
      }
    );
  }

  toggleMateria(materiaId: number, seleccionada: boolean): void {
    if (seleccionada) {
      // Si la materia es seleccionada, agregar su ID al arreglo
      this.materiasSeleccionadas.push(materiaId);
    } else {
      // Si la materia es deseleccionada, eliminar su ID del arreglo
      const index = this.materiasSeleccionadas.indexOf(materiaId);
      if (index > -1) {
        this.materiasSeleccionadas.splice(index, 1);
      }
    }
  }

  guardarMaterias(): void {
    if (this.idCarreraSeleccionada !== null && this.materiasSeleccionadas.length > 0) {
      const datos = {
        id_carrera: +this.idCarreraSeleccionada,
        materias: this.materiasSeleccionadas
      };
      
      console.log('Datos a enviar:', datos);
      
      // Aquí puedes hacer la lógica para guardar los datos en el servidor
      this.apiService.guardarMaterias(datos).subscribe(
        (response) => {
          console.log('Datos guardados correctamente:', response);
          alert('Las materias de la Carrera han sido actualizadas');
          window.location.reload(); 
        },
        (error) => {
          console.error('Error al guardar los datos:', error);
        }
      );
    } else {
      alert('Selecciona una carrera y al menos una materia.');
    }
  }
}
