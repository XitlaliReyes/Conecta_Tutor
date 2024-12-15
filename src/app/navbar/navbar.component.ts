import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';  

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],  
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']  
})
export class NavbarComponent {
  constructor(private router: Router) {}

  getUsuarioOcupacion(): string | null {
    return sessionStorage.getItem('usuarioOcupacion'); // Obtiene la ocupación del usuario
  }
  
  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('usuarioId'); 
  }

  logout(): void {
    sessionStorage.removeItem('usuarioId'); 
    this.router.navigate(['/main']);
  }
}
