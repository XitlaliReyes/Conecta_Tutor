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
  docentes: any[] = [];
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getUsrandCarrera().subscribe(
      (data) => {
        console.log('Datos recibidos:', data); 
        this.usuarios = data;
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );

    this.apiService.getDocentes().subscribe(
      (data) => {
        console.log('Datos recibidos:', data); 
        this.docentes = data;
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );

  }
}
