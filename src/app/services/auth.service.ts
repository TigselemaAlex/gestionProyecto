import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Jwt } from '../model/jwt.model';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private ENDPOINT: string = `${environment.apiURL}/auth`;

  constructor(private http: HttpClient) {}

  public signing(user: User): Observable<Jwt> {
    return this.http.post<Jwt>(this.ENDPOINT, user);
    
  }
}
