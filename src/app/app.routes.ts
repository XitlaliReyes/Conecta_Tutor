import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { MostrarusuariosComponent } from './mostrarusuarios/mostrarusuarios.component';
import { MainComponent } from './main/main.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { PerfilAlumnoComponent } from './perfil-alumno/perfil-alumno.component';
import { PerfilTutorComponent } from './perfil-tutor/perfil-tutor.component';
import { UpdateusrComponent } from './updateusr/updateusr.component';
import { DetalleAsesoriaComponent } from './detalle-asesoria/detalle-asesoria.component';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { DetalleDisponiblesComponent } from './detalle-disponibles/detalle-disponibles.component';
import { AceptacionCursosComponent } from './aceptacion-cursos/aceptacion-cursos.component';
import { PerfilAdminComponent } from './perfil-admin/perfil-admin.component';
import { CrearAsesoriaComponent } from './crear-asesoria/crear-asesoria.component';
import { DetalleTutorComponent } from './detalle-tutor/detalle-tutor.component';

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
  {path: 'perfil-admin', component: PerfilAdminComponent},
  { path: 'updateusr', component: UpdateusrComponent},
  { path: 'detalle/:id', component: DetalleAsesoriaComponent },
  {path: 'solicitud', component: SolicitudComponent},
  {path: 'calendario', component: CalendarioComponent},
  {path: 'detalle2/:id', component: DetalleDisponiblesComponent},
  {path: 'detallet/:id', component: DetalleTutorComponent},
  {path: 'aceptacion/:id', component: AceptacionCursosComponent},
  {path: 'creacion', component: CrearAsesoriaComponent},
  
];
