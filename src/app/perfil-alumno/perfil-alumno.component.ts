import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil-alumno',
  standalone: true,
  imports: [NavbarComponent, CommonModule, RouterModule, FormsModule],
  templateUrl: './perfil-alumno.component.html',
  styleUrls: ['./perfil-alumno.component.css']
})
export class PerfilAlumnoComponent implements OnInit {
  usuarioId: number = 0;  
  asesorias: any[] = [];
  asesoriasAsignadas: any[] = [];

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    const storedId = sessionStorage.getItem('usuarioId');
    if (storedId) {
      this.usuarioId = +storedId; 
    }else {
      this.router.navigate(['/login']);
      return;
    }

    

    this.apiService.getAsesorias(this.usuarioId).subscribe(
      (data)=> {
        console.log('Datos recibidos: ', data);
        this.asesorias = data;
      },(error) => {
        console.error('Error al obtener asesorias:', error);
      }
    );

    this.apiService.getAsesoriasUsuario(this.usuarioId).subscribe(
      (data)=> {
        console.log('Datos recibidos: ', data);
        this.asesoriasAsignadas = data;
      },(error) => {
        console.error('Error al obtener asesorias:', error);
      }
    );
  }
}
