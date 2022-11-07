export class Cliente {
  id: number;
  cedula: string;
  nombre: string;
  apellido: string;
  telefono: string;
  constructor(
    id: number,
    cedula: string,
    nombre: string,
    apellido: string,
    telefono: string
  ) {
    this.id = id;
    this.apellido = apellido;
    this.cedula = cedula;
    this.nombre = nombre;
    this.telefono = telefono;
  }
}
