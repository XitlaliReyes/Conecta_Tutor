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

  agregarUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuarios`, usuario);
  }

  obtenerUsuario(id: number): Observable<any> {
    const url = `${this.apiUrl}/usr/${id}`;
    return this.http.get<any>(url);
  }

  actualizarUsuario(id: number, nuevosDatos: any): Observable<any> {
    const url = `${this.apiUrl}/usuarios`;
    return this.http.put(url, { id, ...nuevosDatos });
  }

  getAsesoria(): Observable<any> {
    return this.http.get(`${this.apiUrl}/asesoria`);
  }

  getMaterias(): Observable<any> {
    return this.http.get(`${this.apiUrl}/materias`);
  }

  getLugar(): Observable<any> {
    return this.http.get(`${this.apiUrl}/lugar`);
  }

}
