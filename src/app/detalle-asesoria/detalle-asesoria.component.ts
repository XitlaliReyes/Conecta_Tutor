import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-asesoria',
  standalone: true,
  imports: [NavbarComponent, CommonModule, ],
  templateUrl: './detalle-asesoria.component.html',
  styleUrl: './detalle-asesoria.component.css'
})
export class DetalleAsesoriaComponent implements OnInit {

  asesoria: any = null;
  lugar: any = null;
  materia: any = null;
  maestro: any = null;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.apiService.getAsesorias().subscribe(
        (asesorias) => {
          this.asesoria = asesorias.find((a: any) => a.id_asesoria === +id);

          if (this.asesoria) {
            this.apiService.getLugar().subscribe((lugares) => {
              this.lugar = lugares.find((l: any) => l.id_lugar === this.asesoria.id_lugar);
            });

            this.apiService.getMaterias().subscribe((materias) => {
              this.materia = materias.find((m: any) => m.id === this.asesoria.id_materia);
            });

            this.apiService.getUsuarios().subscribe((usuarios) => {
              this.maestro = usuarios.find((u: any) => u.id === this.asesoria.id_maestro);
            });
          }
        },
        (error) => {
          console.error('Error al obtener asesorías:', error);
        }
      );
    }
  }
}
