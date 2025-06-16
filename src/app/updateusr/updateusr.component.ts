import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-updateusr',
  standalone: true,
  imports: [FormsModule, NavbarComponent],
  templateUrl: './updateusr.component.html',
  styleUrls: ['./updateusr.component.css']
})
export class UpdateusrComponent implements OnInit {
  usuarioId: number = 0;
  usuario = {
    Nombre: '',
    apellidos: '',
    ocupacion: ''
  };

  nuevaPassword: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    const storedId = sessionStorage.getItem('usuarioId');
    if (storedId) {
      this.usuarioId = +storedId;
      this.obtenerUsuario();
    }
  }

  obtenerUsuario(): void {
    this.apiService.obtenerUsuario(this.usuarioId).subscribe(
      (usuario) => {
        this.usuario = {
          Nombre: usuario.Nombre,
          apellidos: usuario.apellidos,
          ocupacion: usuario.ocupacion
        };
        this.nuevaPassword = ''; 
      },
      (error) => {
        console.error('Error al obtener el usuario:', error);
        alert('Ocurrió un error al cargar los datos.');
      }
    );
  }

  actualizarUsuario(): void {
    if (!this.nuevaPassword) {
      alert('Por favor ingresa una nueva contraseña.');
      return;
    }

    const datosActualizacion = {
      id: this.usuarioId,
      ocupacion: this.usuario.ocupacion,
      password: this.nuevaPassword
    };

    this.apiService.actualizarUsuario(this.usuarioId, datosActualizacion).subscribe(
      (response) => {
        alert('Contraseña actualizada con éxito.');
        this.nuevaPassword = ''; // Limpiar el campo después de actualizar
      },
      (error) => {
        console.error('Error al actualizar contraseña:', error);
        alert('Ocurrió un error al actualizar la contraseña.');
      }
    );
  }
}
