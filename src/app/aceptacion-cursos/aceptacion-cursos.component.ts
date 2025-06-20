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
  maestros: any[] = [];
  selectedLugar: any;
  selectedFecha: string = "";
  selectedMaesto: string = "";
  usuarioId: number = 0; 
  ocupacion: string = "";

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  

  ngOnInit(): void {
    const storedId = sessionStorage.getItem('usuarioId');

    if (storedId) {
      this.usuarioId = +storedId; 

      this.ocupacion = sessionStorage.getItem('usuarioOcupacion') || '';
      console.log('Ocupación cargada:', this.ocupacion);

    } else {alert('Debe iniciar sesión para continuar.');
        this.router.navigate(['/login']);
        return;
    }
 

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

    this.apiService.getAsesores().subscribe(
      data => {
        this.maestros = data;  
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

  inscribirse(): void {
    if (this.ocupacion === 'tutor' && this.selectedFecha && this.selectedLugar && this.usuarioId) {
      
      const nuevosDatos = {
        fecha_inicio: this.selectedFecha,
        id_lugar: +this.selectedLugar,
        id_maestro: this.usuarioId
      };
  
      this.apiService.actualizarAsesoria(this.asesoria.id_asesoria, nuevosDatos).subscribe(
        (response) => {
          alert('Asesoría actualizada correctamente.');
          //console.log('Respuesta del servidor:', response);
          this.router.navigate(['/perfil-tutor']);
        },
        (error) => {
          console.error('Error al actualizar la asesoría:', error);
          alert('Hubo un problema al actualizar la asesoría.');
        }
      );
    }else if (this.ocupacion === 'admin' && this.selectedFecha && this.selectedLugar && this.selectedMaesto) {
      
      const nuevosDatos = {
        fecha_inicio: this.selectedFecha,
        id_lugar: +this.selectedLugar,
        id_maestro: +this.selectedMaesto
      };
  
      this.apiService.actualizarAsesoria(this.asesoria.id_asesoria, nuevosDatos).subscribe(
        (response) => {
          alert('Asesoría actualizada correctamente.');
          //console.log('Respuesta del servidor:', response);
          this.router.navigate(['/perfil-admin']);
        },
        (error) => {
          console.error('Error al actualizar la asesoría:', error);
          alert('Hubo un problema al actualizar la asesoría.');
        }
      );
    } else {
      alert('Debe completar todos los campos.');
    }
  }
  
}