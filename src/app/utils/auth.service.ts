import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { SessionStorageService } from './session-storage.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private sessionStorageService: SessionStorageService,
  ) { }

  getUserToken(): string {
    return this.sessionStorageService.getItem('token');
  }

  getUserRole(): string {
    return this.sessionStorageService.getItem('userType');
  }

  isTokenValid(): boolean {
    const token = this.getUserToken();
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const expirationDate = decodedToken.exp ? new Date(0) : null;
        if (expirationDate) {
          expirationDate.setUTCSeconds(decodedToken.exp!);
          return expirationDate.valueOf() > new Date().valueOf();
        }
        return false;
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        return false;
      }
    }
    return false;
  }
}
