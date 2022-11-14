import { Cliente } from './cliente.model';
import { Habitacion } from './habitacion.model';

export class Reserva {
  id?: number;
  fechaentrada: string | Date;
  fechasalida: string | Date;
  pagohabitacion: boolean | any;
  cliente: number | Cliente | string;
  habitacion: number | Habitacion | string;

  constructor(
    fechaentrada: string,
    fechasalida: string,
    pagohabitacion: boolean,
    cliente: number | Cliente | string,
    habitacion: number | Habitacion | string,
    id?: number
  ) {
    this.fechaentrada = fechaentrada;
    this.fechasalida = fechasalida;
    this.pagohabitacion = pagohabitacion;
    this.cliente = cliente;
    this.habitacion = habitacion;
    this.id = id;
  }
}
