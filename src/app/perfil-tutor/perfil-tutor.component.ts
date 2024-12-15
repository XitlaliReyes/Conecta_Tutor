import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-perfil-tutor',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule, RouterModule],
  templateUrl: './perfil-tutor.component.html',
  styleUrl: './perfil-tutor.component.css'
})
export class PerfilTutorComponent {
  usuarioId: number = 0; 
  asesoriasPendientes: any[] = [];
  asesoriasAsignadas: any[] = [];

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    const storedId = sessionStorage.getItem('usuarioId');

    if (storedId) {
      this.usuarioId = +storedId; 
    } else {
        this.router.navigate(['/login']);
        return;
    }
  
    this.getAsesoriasPendientes();
    this.getAsesoriasAsesor();
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

  getAsesoriasAsesor(): void {
    this.apiService.getAsesoriasAsesor(this.usuarioId).subscribe(
      (data)=> {
        console.log('Datos recibidos: ', data);
        this.asesoriasAsignadas = data;
      },(error) => {
        console.error('Error al obtener asesorias:', error);
      }
    );
  }
}