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

  // Método para obtener el token del usuario (suponiendo que lo guardas en localStorage)
  getUserToken(): string {
    return this.sessionStorageService.getItem('token');
  }

  getUserRole(): string {
    return this.sessionStorageService.getItem('userType');
  }

  // Método para verificar si el token es válido
  isTokenValid(): boolean {
    const token = this.getUserToken();
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const expirationDate = decodedToken.exp ? new Date(0) : null;
        if (expirationDate) {
          expirationDate.setUTCSeconds(decodedToken.exp!); // '!' asegura a TypeScript que 'exp' no es 'undefined'
          return expirationDate.valueOf() > new Date().valueOf();
        }
        return false;
      } catch (error) {
        // Si hay un error al decodificar el token, se considera inválido
        console.error('Error al decodificar el token:', error);
        return false;
      }
    }
    return false; // Si no hay token, se considera inválido
  }
}
