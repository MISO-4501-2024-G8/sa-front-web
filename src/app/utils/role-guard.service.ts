import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const tokenValid = this.authService.isTokenValid();
    if (!tokenValid) {
      this.router.navigate(['/login']);
      return false;
    }
    const expectedRole = route.data['expectedRole'];
    const userRol = this.authService.getUserRole();
    if (userRol !== expectedRole) {
      if (userRol === '2') {
        this.router.navigate(['/third-home']);
        return true;
      } else if (userRol === '1') {
        this.router.navigate(['/home']);
        return true;
      } else {
        this.router.navigate(['/']);
        return false;
      }
    }
    return true;
  }
}
