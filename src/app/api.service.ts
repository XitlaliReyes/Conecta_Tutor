import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://192.168.0.246:3001';  // La URL de tu API

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuarios`);
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

  actualizarUsuario(id: number, nuevosDatos: any): Observable<any> {
    const url = `${this.apiUrl}/usuarios`;
    return this.http.put(url, { id, ...nuevosDatos });
  }

  getAsesoriasUsuario(id:number): Observable<any> {
    const url = `${this.apiUrl}/asesorias/alumno/${id}`;
    return this.http.get<any>(url);
  }

  getDetallesAsesorias(): Observable<any> {
    return this.http.get(`${this.apiUrl}/asesorias`);
  }

  getAsesorias(id:number): Observable<any> {
    const url = `${this.apiUrl}/asesorias/${id}`;
    return this.http.get<any>(url);
  }

  getMaterias(): Observable<any> {
    return this.http.get(`${this.apiUrl}/materias`);
  }

  getLugar(): Observable<any> {
    return this.http.get(`${this.apiUrl}/lugar`);
  }

  getAlumnoAsesoria(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/alumnoasesoria`);
  }

  getAsesoriaPendientes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/asesoriaspendientes`);
  }

  enviarSolicitud(solicitud: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/asesoria`, solicitud);
  }
}
