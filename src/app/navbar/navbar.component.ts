import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // Asegúrate de importar RouterModule

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],  // Agrega RouterModule a los imports
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']  // Corregido 'styleUrl' a 'styleUrls'
})
export class NavbarComponent {
}
