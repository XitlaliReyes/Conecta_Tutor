import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalle-disponibles',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './detalle-disponibles.component.html',
  styleUrl: './detalle-disponibles.component.css'
})
export class DetalleDisponiblesComponent {
  asesoria: any = null;
  usuarioId: number = 0; 

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    const storedId = sessionStorage.getItem('usuarioId');
    if (storedId) {
      this.usuarioId = +storedId; 
    } else {
      console.error('Usuario no autenticado. No se encontró el id del usuario en sessionStorage.');
      return; 
    }

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.apiService.getDetallesAsesorias().subscribe(
        (asesorias) => {
          this.asesoria = asesorias.find((a: any) => a.id_asesoria === +id);
        },
        (error) => {
          console.error('Error al obtener la asesoría:', error);
        }
      );
    }
  }

  baja(): void {
    if (this.asesoria) {
      const idAsesoria = this.asesoria.id_asesoria; 
      this.apiService.eliminarAsesoriaUsuario(idAsesoria, this.usuarioId).subscribe(
        () => {
          alert('Dado de baja');
          this.router.navigate(['/perfil-alumno']);
        },
        (error) => {
          console.error('Error al darse de baja:', error);
          alert('Ocurrió un error al darse de baja. Inténtalo de nuevo.');
        }
      );
    } else {
      alert('No se ha encontrado la asesoría.');
    }
  }
}
