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

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Obtiene el ID desde la URL
    if (id) {
      this.apiService.getDetallesAsesorias().subscribe(
        (asesorias) => {
          // Busca la asesoría por ID
          this.asesoria = asesorias.find((a: any) => a.id_asesoria === +id);
        },
        (error) => {
          console.error('Error al obtener la asesoría:', error);
        }
      );
    }
  }
}