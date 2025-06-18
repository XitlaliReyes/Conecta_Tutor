import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://192.168.137.42:3001';  // La URL de tu API

  constructor(private http: HttpClient) { }

  loginUsuario(credentials: { id: string, password: string }) {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }
  
  getUsuarios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuarios`);
  }

  getUsrandCarrera(): Observable<any> {
    return this.http.get(`${this.apiUrl}/usrandCarrera`);
  }

  getDocentes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/docentes`);
  }

  getCarrera(): Observable<any> {
    return this.http.get(`${this.apiUrl}/carreras`);
  }

  getAllAsesorias(): Observable<any> {
    return this.http.get(`${this.apiUrl}/asesorias`);
  }

  agregarUsuario(usuario: any): Observable<any> {
  const ruta = usuario.ocupacion === 'alumno' ? '/alumnos' : '/tutores';
  return this.http.post(`${this.apiUrl}${ruta}`, usuario);
}

  agregarCarrera(nombre: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/carrera`, { nombre });
  }
  
  agregarMateria(nombre: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/materia`, { nombre });
  }
  
  altaAsesoriaUsuario(idAsesoria: number, idUsuario: number): Observable<void> {
    const body = { idAsesoria, idUsuario };
    return this.http.post<void>(`${this.apiUrl}/alta`, body);
  }

  eliminarAsesoriaUsuario(idAsesoria: number, idUsuario: number): Observable<void> {
    const body = { idAsesoria, idUsuario };
    return this.http.post<void>(`${this.apiUrl}/baja`, body);
  }

  obtenerUsuario(id: number): Observable<any> {
    const url = `${this.apiUrl}/usr/${id}`;
    return this.http.get<any>(url);
  }

actualizarUsuario(id: number, nuevosDatos: any): Observable<any> {
  const url = `${this.apiUrl}/usuarios`;
  return this.http.put(url, { id, ...nuevosDatos });
}

// Tutores aceptar asesoria
  actualizarAsesoria(id_asesoria:number, nuevosDatos: any): Observable<any>{
    const url = `${this.apiUrl}/asesoriaMongo`;
    return this.http.put(url, { id_asesoria, ...nuevosDatos });
  }

  //Cancelar Asesoria
  cancelarAsesoria(solicitud: any): Observable<any> {
    const url = `${this.apiUrl}/cancelarasesoriaMongo`;
    return this.http.put(url, solicitud);
  }

  guardarMaterias(solicitud: any): Observable<any> {
    const url = `${this.apiUrl}/actualizar-carrera-materias`;
    return this.http.put(url, solicitud);
  }

  //Recupera en las que esta incrito el alumno
  getAsesoriasUsuario(id:number): Observable<any> {
    const url = `${this.apiUrl}/asesoriasMongo/alumno/${id}`;
    return this.http.get<any>(url);
  }

  getAsesoriasAsesor(id:number): Observable<any> {
    const url = `${this.apiUrl}/asesorias/asesor/${id}`;
    return this.http.get<any>(url);
  }

  //Recupera los alumnos que estan inscritos en la asesoria
  getAlumnos(id_asesoria:string): Observable<any> {
    const url = `${this.apiUrl}/alumnos/${id_asesoria}`;
    return this.http.get<any>(url);
  }

  getDetallesAsesorias(): Observable<any> {
    return this.http.get(`${this.apiUrl}/asesorias`);
  }

  getDetallesAsesorias2(): Observable<any> {
    return this.http.get(`${this.apiUrl}/asesoriasMongo`);
  }

  getCarreraMaterias(): Observable<any> {
    return this.http.get(`${this.apiUrl}/carrera-materias`);
  }

  getAsesorias(id:number): Observable<any> {
    const url = `${this.apiUrl}/asesoriasMongo/${id}`;
    return this.http.get<any>(url);
  }

  getMaterias(id:number): Observable<any> {
    const url = `${this.apiUrl}/materias/${id}`;
    return this.http.get<any>(url);
  }

  getMateria(): Observable<any> {
    return this.http.get(`${this.apiUrl}/materias`);
  }

  getAsesores(): Observable<any> {
    return this.http.get(`${this.apiUrl}/asesores`);
  }

  getLugar(): Observable<any> {
    return this.http.get(`${this.apiUrl}/lugares`);
  }

  getAlumnoAsesoria(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/alumnoasesoria`);
  }

  getAsesoriaPendientes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/asesoriasPendientes`);
  }


  //Cambiar a aseosriasSolicit
  getAsesoriasSolicitadas(idUsuario: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/asesoriasSolicitadasMongo/${idUsuario}`);
  }
  
  //Alumno
  enviarSolicitud(solicitud: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/asesoriaMongo`, solicitud);
  }

  crearAsesoria(asesoria: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/crear-asesoria`, asesoria);
  }
  eliminarAsesoriaTutor(idAsesoria: number, idUsuario: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/baja-asesoria`, { id_asesoria: idAsesoria, id_maestro: idUsuario });
  }

  // sendEmail(to: string, subject: string, text: string, html: string) {
  //   return this.http.post(`${this.apiUrl}/send-email`, { to, subject, text, html });
  // }
  
  sendEmail(to: string, subject: string, text: string, html: string) {
    return this.http.post(`${this.apiUrl}/send-email`, { to, subject, text, html }, { responseType: 'text' });
  }
  
  crearEventoCalendario(datosEvento: any): Observable<any> {
    //return this.http.post<any>(`${this.apiUrl}/calendario`, datosEvento);

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/calendario`, datosEvento, { headers });
  }

  
    
}
