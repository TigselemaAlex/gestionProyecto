export class Habitacion {
  id?: number;
  numero: number;
  estado: boolean | any;
  tipo: string | any;
  precio: number;
  constructor(
    numero: number,
    estado: boolean | string,
    tipo: string,
    precio: number,
    id?: number
  ) {
    this.numero = numero;
    this.estado = estado;
    this.tipo = tipo;
    this.precio = precio;
    this.id = id;
  }
}
