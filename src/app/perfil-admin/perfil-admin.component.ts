import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-perfil-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NavbarComponent],
  templateUrl: './perfil-admin.component.html',
  styleUrl: './perfil-admin.component.css'
})
export class PerfilAdminComponent implements OnInit {
  asesorias: any[] = [];
  asesoriasActivas: any[] = [];
  asesoriasPendientes: any[] = [];
  usuarioId: number = 0;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    const storedId = sessionStorage.getItem('usuarioId');
    if (storedId) {
      this.usuarioId = +storedId;
    } else {
      this.router.navigate(['/login']);
      return;
    }

    this.apiService.getAllAsesorias().subscribe(
      (data) => {
        console.log('Datos recibidos: ', data);
        this.asesorias = data;
        // Filtrar las asesorías activas después de recibir los datos
        this.asesoriasActivas = this.asesorias.filter(asesoria => asesoria.estado === 'En curso');
        this.asesoriasPendientes = this.asesorias.filter(asesoria => asesoria.estado === 'Pendiente');
      },
      (error) => {
        console.error('Error al obtener asesorías:', error);
      }
    );
  }

  getUsuarioOcupacion(): string | null {
    return sessionStorage.getItem('usuarioOcupacion'); // Obtiene la ocupación del usuario
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('usuarioId'); 
  }

  logout(): void {
    sessionStorage.removeItem('usuarioId'); 
    this.router.navigate(['/main']);
  }
}
