import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  public roles: Array<string> = [];

  constructor() {}

  public setToken(token: string): void {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY) || '';
  }

  public setUsername(username: string): void {
    sessionStorage.removeItem(USERNAME_KEY);
    sessionStorage.setItem(USERNAME_KEY, username);
  }

  public getUsername(): string {
    return sessionStorage.getItem(USERNAME_KEY) || '';
  }

  public setAuthorities(authorities: string[]): void {
    sessionStorage.removeItem(AUTHORITIES_KEY);
    sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[] {
    JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY) || '').array.forEach(
      (authority: { authority: string }) => {
        if (authority.authority) this.roles.push(authority.authority);
      }
    );
    return this.roles;
  }

  public logOut(): void {
    sessionStorage.clear();
  }
}
