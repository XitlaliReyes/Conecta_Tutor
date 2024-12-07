import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { MostrarusuariosComponent } from './mostrarusuarios/mostrarusuarios.component';
import { MainComponent } from './main/main.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { PerfilAlumnoComponent } from './perfil-alumno/perfil-alumno.component';
import { PerfilTutorComponent } from './perfil-tutor/perfil-tutor.component';
import { UpdateusrComponent } from './updateusr/updateusr.component';

export const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'usuarios', component: MostrarusuariosComponent },
  { path: 'main', component: MainComponent },
  { path: 'mostrarusuarios', component: MostrarusuariosComponent},
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component: LoginComponent},
  { path: 'perfil-alumno', component: PerfilAlumnoComponent},
  { path: 'perfil-tutor', component: PerfilTutorComponent},
  { path: 'updateusr', component: UpdateusrComponent}
];
