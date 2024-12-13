import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-perfil-tutor',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule, RouterModule],
  templateUrl: './perfil-tutor.component.html',
  styleUrl: './perfil-tutor.component.css'
})
export class PerfilTutorComponent {
  asesoriasPendientes: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getAsesoriasPendientes();
  }

  // Obtener asesorías pendientes
  getAsesoriasPendientes(): void {
    this.apiService.getAsesoriaPendientes().subscribe(
      (data) => {
        this.asesoriasPendientes = data;
        console.log(this.asesoriasPendientes); // Verifica si los datos son correctos
      },
      (error) => {
        console.error('Error al obtener las asesorías pendientes:', error);
      }
    );
  }
}