import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-mostrarusuarios',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './mostrarusuarios.component.html',
  styleUrls: ['./mostrarusuarios.component.css']
})

export class MostrarusuariosComponent implements OnInit {

  usuarios: any[] = [];
  carreras: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getUsuarios().subscribe(
      (data) => {
        console.log('Datos recibidos:', data); 
        this.usuarios = data;

        // Ordenar los usuarios por carrera (id_carrera)
        this.usuarios.sort((a, b) => {
          if (a.id_carrera < b.id_carrera) {
            return -1;
          } else if (a.id_carrera > b.id_carrera) {
            return 1;
          }
          return 0;
        });
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
    this.apiService.getCarrera().subscribe(
      (data) => {
        console.log('Datos recibidos:', data); 
        this.carreras = data;
      },
      (error) => {
        console.error('Error al obtener carreras:', error);
      }
    );
  }
  getCarreraNombre(id_carrera: number): string {
    const carrera = this.carreras.find(c => c.id === id_carrera);
    return carrera ? carrera.nombre : 'Carrera no asignada'; // Si no tiene carrera, mostrar "Carrera no asignada"
  }
}
