import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalle-asesoria',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './detalle-asesoria.component.html',
  styleUrls: ['./detalle-asesoria.component.css']
})
export class DetalleAsesoriaComponent implements OnInit {
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
          console.log('Asesorías recibidas:', asesorias);
          console.log('ID recibido de ruta:', id);

          this.asesoria = asesorias.find((a: any) => +a.id_asesoria === +id);

          if (!this.asesoria) {
            console.warn('No se encontró asesoría con id:', id);
          }
        },
        (error) => {
          console.error('Error al obtener asesorías:', error);
        }
    );
    }
  }

  inscribirse(): void {
    if (this.asesoria) {
      const idAsesoria = this.asesoria.id_asesoria; 
      this.apiService.altaAsesoriaUsuario(idAsesoria, this.usuarioId).subscribe(
        () => {
          alert('Inscripción exitosa!');
          this.router.navigate(['/perfil-alumno']);
        },
        (error) => {
          console.error('Error al inscribirse:', error);
          alert('Ocurrió un error al inscribirse. Inténtalo de nuevo.');
        }
      );
    } else {
      alert('No se ha encontrado la asesoría.');
    }
  }
}
