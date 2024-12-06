import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mostrarusuarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mostrarusuarios.component.html',
  styleUrls: ['./mostrarusuarios.component.css']
})

export class MostrarusuariosComponent implements OnInit {

  usuarios: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getUsuarios().subscribe(
      (data) => {
        console.log('Datos recibidos:', data); // Esto mostrará los datos en la consola
        this.usuarios = data;
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }
  
}
