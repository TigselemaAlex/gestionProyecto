import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../model/cliente.model';
import { Habitacion } from '../model/habitacion.model';
import { Reserva } from '../model/reserva.model';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  private ENDPOINT: string = `${environment.apiURL}/reservas`;
  constructor(private http: HttpClient) {}

  public getReservas(): Observable<Reserva[]> {
    return this.http.get(this.ENDPOINT).pipe(
      map((response) => {
        let reservas: Reserva[] = response as Reserva[];
        reservas.forEach((r) => {
          const cliente = r.cliente as Cliente;
          const habitacion = r.habitacion as Habitacion;
          let datePipe = new DatePipe('en-US');
          r.cliente =
            cliente.cedula + ' ' + cliente.nombre + ' ' + cliente.apellido;
          r.habitacion = habitacion.numero;
          r.fechaentrada = datePipe.transform(
            r.fechaentrada,
            'dd-MM-yyyy'
          ) as string;

          r.fechasalida = datePipe.transform(
            r.fechasalida,
            'dd-MM-yyyy'
          ) as string;
          if (r.pagohabitacion == true) {
            r.pagohabitacion = 'Si';
          } else {
            r.pagohabitacion = 'No';
          }
        });
        return reservas;
      })
    );
  }

  public addReserva(reserva: Reserva): Observable<Reserva> {
    return this.http.post<Reserva>(this.ENDPOINT, reserva);
  }

  public getReserva(id: number): Observable<Reserva> {
    return this.http.get(`${this.ENDPOINT}/${id}`).pipe(
      map((response) => {
        let r = response as Reserva;
        const cliente = r.cliente as Cliente;
        const habitacion = r.habitacion as Habitacion;
        let datePipe = new DatePipe('en-US');
        r.cliente = cliente.id.toString();
        r.habitacion = habitacion.id.toString();
        r.fechaentrada = datePipe.transform(
          r.fechaentrada,
          'dd-MM-yyyy'
        ) as string;

        r.fechasalida = datePipe.transform(
          r.fechasalida,
          'dd-MM-yyyy'
        ) as string;
        if (r.pagohabitacion == true) {
          r.pagohabitacion = '1';
        } else {
          r.pagohabitacion = '0';
        }
        return r;
      })
    );
  }

  public editReserva(id: number, reserva: Reserva): Observable<Reserva> {
    return this.http.put<Reserva>(`${this.ENDPOINT}/${id}`, reserva);
  }

  public deteReserva(id: number): Observable<Reserva> {
    return this.http.delete<Reserva>(`${this.ENDPOINT}/${id}`);
  }
}
