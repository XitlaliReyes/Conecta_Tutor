import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  credentials = {
    id: '',
    password: ''
  };
  usuarios: any[] = [];

  constructor(private apiService: ApiService, private router: Router) { }

  onSubmit() {
    this.apiService.getUsuarios().subscribe(
      (data) => {
        this.usuarios = data;
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  
    for (let i = 0; i < this.usuarios.length; i++) {
      if (this.usuarios[i].id === this.credentials.id && this.usuarios[i].password === this.credentials.password) {
        sessionStorage.setItem('usuarioId', this.usuarios[i].id);
        sessionStorage.setItem('usuarioOcupacion', this.usuarios[i].ocupacion); // Guarda la ocupación del usuario  

        // Redirigir a la página de perfil según el tipo de usuario
        if (this.usuarios[i].ocupacion === 'alumno') {
          this.router.navigate(['/perfil-alumno']);
        } else if (this.usuarios[i].ocupacion === 'tutor') {
          this.router.navigate(['/perfil-tutor']);
        } else if (this.usuarios[i].ocupacion === 'admin') {
          this.router.navigate(['/perfil-admin']);
        }
        return;
      }
    }

    console.log('Formulario enviado');
  }

}
