import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-perfil-alumno',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './perfil-alumno.component.html',
  styleUrl: './perfil-alumno.component.css'
})

export class PerfilAlumnoComponent {
  usuarioId: number;

  constructor() {
    const storedId = sessionStorage.getItem('usuarioId') as string; 
    this.usuarioId = storedId ? +storedId : 0;
  }
}


