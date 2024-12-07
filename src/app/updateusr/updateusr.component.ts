import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-updateusr',
  standalone: true,
  imports: [FormsModule, NavbarComponent],
  templateUrl: './updateusr.component.html',
  styleUrls: ['./updateusr.component.css']  // Asegúrate de que el nombre de tu archivo sea 'styleUrls' y no 'styleUrl'
})
export class UpdateusrComponent implements OnInit {
  usuarioId: number = 0;  // Asegúrate de que sea un número
  usuario = {
    nombre: '',
    apellidos: '',
    ocupacion: '',
    password: ''
  };

  constructor(private apiService: ApiService) { }

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
        this.usuario = usuario;
      },
      (error) => {
        console.error('Error al obtener el usuario:', error);
        alert('Ocurrió un error al cargar los datos.');
      }
    );
  }

  actualizarUsuario(): void {
    this.apiService.actualizarUsuario(this.usuarioId, this.usuario).subscribe(
      (response) => {
        console.log('Usuario actualizado:', response);
        alert('Datos actualizados con éxito.');
      },
      (error) => {
        console.error('Error al actualizar usuario:', error);
        alert('Ocurrió un error al actualizar los datos.');
      }
    );
  }
}
