import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Habitacion } from '../model/habitacion.model';

@Injectable({
  providedIn: 'root',
})
export class HabitacionService {
  private ENDPOINT: string = `${environment.apiURL}/habitaciones`;
  constructor(private http: HttpClient) {}

  getHabitaciones(): Observable<Habitacion[]> {
    return this.http.get(this.ENDPOINT).pipe(
      map((response) => {
        let habitaciones = response as Habitacion[];
        habitaciones.forEach((h) => {
          if (h.estado == true) {
            h.estado = 'disponible';
          } else {
            h.estado = 'ocupado';
          }
        });
        return habitaciones;
      })
    );
  }

  getHabitacionById(id: number): Observable<Habitacion> {
    return this.http.get(`${this.ENDPOINT}/${id}`).pipe(
      map((response) => {
        let habitacion = response as Habitacion;
        if (habitacion.estado == true) {
          habitacion.estado = 'disponible';
        } else {
          habitacion.estado = 'ocupado';
        }
        return habitacion;
      })
    );
  }

  addHabitacion(habitacion: Habitacion): Observable<Habitacion> {
    return this.http.post<Habitacion>(this.ENDPOINT, habitacion);
  }

  editHabitacion(id: number, habitacion: Habitacion): Observable<Habitacion> {
    return this.http.put<Habitacion>(`${this.ENDPOINT}/${id}`, habitacion);
  }

  deleteHabitacion(id: number): Observable<Habitacion> {
    return this.http.delete<Habitacion>(`${this.ENDPOINT}/${id}`);
  }
}
