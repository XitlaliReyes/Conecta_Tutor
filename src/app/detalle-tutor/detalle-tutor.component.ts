import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalle-tutor',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './detalle-tutor.component.html',
  styleUrl: './detalle-tutor.component.css'
})
export class DetalleTutorComponent {
  asesoria: any = null;
  usuarioId: number = 0;
  alumnos: any[] = [];
  ocupacion: string = '';

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    const storedId = sessionStorage.getItem('usuarioId');
    if (storedId) {
      this.usuarioId = +storedId; 
      this.ocupacion = sessionStorage.getItem('usuarioOcupacion') || '';
      console.log('Ocupación cargada:', this.ocupacion);

    } else {
      console.error('Usuario no autenticado. No se encontró el id del usuario en sessionStorage.');
      return; 
    }

    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      
      this.apiService.getDetallesAsesorias().subscribe(
        (asesorias) => {
          console.log('Asesorías recibidas:', asesorias);
          this.asesoria = asesorias.find((a: any) => a.id_asesoria === +id);
          console.log('Asesoría seleccionada:', this.asesoria);
        },
        (error) => {
          console.error('Error al obtener la asesoría:', error);
        }
      );
      
      this.apiService.getAlumnos(id).subscribe(
        (data) => {
          console.log('Datos recibidos:', data); // Asegúrate de que se reciben alumnos
          this.alumnos = data;
        },
        (error) => {
          console.error('Error al obtener usuarios:', error);
        }
      );
      

    }
  }

  baja(): void {
    if (
      this.asesoria &&
      this.usuarioId &&
      (this.ocupacion === 'tutor' || this.ocupacion === 'admin')
    ) {
      const idAsesoria = this.asesoria.id_asesoria;
      const idUsuario = this.usuarioId;

      this.apiService.eliminarAsesoriaTutor(idAsesoria, idUsuario).subscribe(
        (response) => {
          alert('La asesoría ha sido dada de baja.');

          // Redirige según el rol
          if (this.ocupacion === 'admin') {
            this.router.navigate(['/perfil-admin']);
          } else {
            this.router.navigate(['/perfil-tutor']);
          }
        },
        (error) => {
          console.error('Error al darse de baja:', error);
          alert('Ocurrió un error al darse de baja. Inténtalo nuevamente.');
        }
      );
    } else {
      alert('No se encontró la asesoría o el usuario para dar de baja.');
    }
  }

}
