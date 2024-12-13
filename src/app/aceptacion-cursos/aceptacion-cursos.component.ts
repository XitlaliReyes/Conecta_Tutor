import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aceptacion-cursos',
  standalone: true,
  imports: [NavbarComponent, RouterModule, FormsModule, CommonModule],
  templateUrl: './aceptacion-cursos.component.html',
  styleUrl: './aceptacion-cursos.component.css'
})
export class AceptacionCursosComponent implements OnInit{

  asesoria: any;
  lugares: any[] = [];
  selectedLugar: any;
  selectedFecha: string = "";

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const idAsesoria = this.route.snapshot.paramMap.get('id');
    
    if (idAsesoria) {
      this.getAsesoriaDetails(idAsesoria); 
    }

    this.apiService.getLugar().subscribe(
      data => {
        this.lugares = data;  
      },
      error => {
        console.error('Error al obtener los lugares:', error);
      }
    );
  }

  getAsesoriaDetails(id: string): void {
    this.apiService.getDetallesAsesorias().subscribe(
      (asesorias) => {
        this.asesoria = asesorias.find((a: any) => a.id_asesoria === +id);
      },
      (error) => {
        console.error('Error al obtener la asesoría:', error);
      }
    );
  }

  // Método para manejar la acción de inscripción
  inscribirse(): void {
    // Lógica para inscribirse con la fecha seleccionada y el lugar seleccionado
    if (this.selectedFecha && this.selectedLugar) {
      console.log(`Inscripción exitosa! Fecha: ${this.selectedFecha}, Lugar: ${this.selectedLugar.nombre}`);
      // Aquí puedes hacer un POST a la API o alguna lógica que actualice la asesoría
    } else {
      alert("Debe seleccionar una fecha y un lugar.");
    }
  }
}
