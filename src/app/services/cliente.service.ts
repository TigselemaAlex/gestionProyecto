import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Cliente } from '../model/cliente.model';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private ENDPOINT: string = `${environment.apiURL}/clientes`;

  constructor(private http: HttpClient) {}

  getClientes(): Observable<Cliente[]> {
    return this.http.get(this.ENDPOINT).pipe(
      map((response) => {
        return response as Cliente[];
      })
    );
  }

  getClienteById(id: number): Observable<Cliente> {
    return this.http
      .get(`${this.ENDPOINT}/${id}`)
      .pipe(map((response) => response as Cliente));
  }

  addCliente(cliente: Cliente): Observable<Cliente> {
    return this.http
      .post(this.ENDPOINT, cliente)
      .pipe(map((response) => response as Cliente));
  }

  editarCliente(id: number, cliente: Cliente): Observable<Cliente> {
    return this.http
      .put(`${this.ENDPOINT}/${id}`, cliente)
      .pipe(map((response) => response as Cliente));
  }

  eliminarCliente(id: number): Observable<Cliente> {
    return this.http
      .delete(`${this.ENDPOINT}/${id}`)
      .pipe(map((response) => response as Cliente));
  }
}
