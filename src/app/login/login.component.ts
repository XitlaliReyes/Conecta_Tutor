import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';

interface Usuario {
  id: string;
  password: string;
  ocupacion: string;
}

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

  constructor(private apiService: ApiService, private router: Router) { }

  /*onSubmit() {
    this.apiService.getUsuarios().subscribe(
      (usuarios: Usuario[]) => {
        // Ahora que tenemos los usuarios tipados, podemos usar find sin problemas
        const usuario = usuarios.find(u => u.id === this.credentials.id && u.password === this.credentials.password);

        if (usuario) {
          // Almacenar los datos en sessionStorage
          sessionStorage.setItem('usuarioId', usuario.id);
          sessionStorage.setItem('usuarioOcupacion', usuario.ocupacion);

          if (usuario.ocupacion === 'alumno') {
            this.router.navigate(['/perfil-alumno']);
          } else if (usuario.ocupacion === 'tutor') {
            this.router.navigate(['/perfil-tutor']);
          } else if (usuario.ocupacion === 'admin') {
            this.router.navigate(['/perfil-admin']);
          }
        } else {
          console.log('Credenciales incorrectas');
        }
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }*/

    onSubmit() {
      this.apiService.loginUsuario(this.credentials).subscribe(
        (response: any) => {
          const usuario = response.usuario;
          sessionStorage.setItem('usuarioId', usuario.id);
          sessionStorage.setItem('usuarioOcupacion', usuario.ocupacion);
    
          if (usuario.ocupacion === 'alumno') {
            this.router.navigate(['/perfil-alumno']);
          } else if (usuario.ocupacion === 'tutor') {
            this.router.navigate(['/perfil-tutor']);
          } else if (usuario.ocupacion === 'admin') {
            this.router.navigate(['/perfil-admin']);
          }
        },
        (error) => {
          console.error('Error en login:', error.error?.error || 'Credenciales inválidas');
        }
      );
    }
    
}
