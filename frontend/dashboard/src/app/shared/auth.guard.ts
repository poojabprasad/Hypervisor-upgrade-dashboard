import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAdmin().then(
      (authenticate: Boolean) => {
        if (authenticate) {
          return true;
        } else {
          this.router.navigate(['/home']);
          return false;
        }
      }
    );
  }

  constructor(private  authService: AuthService,
              private router: Router) {}

}
