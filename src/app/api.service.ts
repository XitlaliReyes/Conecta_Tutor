import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3001';  // La URL de tu API

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuarios`);
  }

  getCarrera(): Observable<any> {
    return this.http.get(`${this.apiUrl}/carreras`);
  }

  getAllAsesorias(): Observable<any> {
    return this.http.get(`${this.apiUrl}/asesorias`);
  }

  agregarUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuarios`, usuario);
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

  actualizarUsuario(id_asesoria: number, nuevosDatos: any): Observable<any> {
    const url = `${this.apiUrl}/usuarios`;
    return this.http.put(url, { id_asesoria, ...nuevosDatos });
  }

  actualizarAsesoria(id_asesoria:number, nuevosDatos: any): Observable<any>{
    const url = `${this.apiUrl}/asesoria`;
    return this.http.put(url, { id_asesoria, ...nuevosDatos });
  }

  cancelarAsesoria(solicitud: any): Observable<any> {
    const url = `${this.apiUrl}/cancelarasesoria`;
    return this.http.put(url, solicitud);
  }

  getAsesoriasUsuario(id:number): Observable<any> {
    const url = `${this.apiUrl}/asesorias/alumno/${id}`;
    return this.http.get<any>(url);
  }

  getAsesoriasAsesor(id:number): Observable<any> {
    const url = `${this.apiUrl}/asesorias/asesor/${id}`;
    return this.http.get<any>(url);
  }

  getAlumnos(id_asesoria:string): Observable<any> {
    const url = `${this.apiUrl}/alumnos/${id_asesoria}`;
    return this.http.get<any>(url);
  }

  getDetallesAsesorias(): Observable<any> {
    return this.http.get(`${this.apiUrl}/asesorias`);
  }

  getAsesorias(id:number): Observable<any> {
    const url = `${this.apiUrl}/asesorias/${id}`;
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
    return this.http.get(`${this.apiUrl}/asesoriaspendientes`);
  }

  getAsesoriasSolicitadas(idUsuario: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/asesoriasSolicitadas/${idUsuario}`);
  }
  
  enviarSolicitud(solicitud: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/asesoria`, solicitud);
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
  
}
