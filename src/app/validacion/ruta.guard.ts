import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class RutaGuard implements CanActivate {
  constructor( public router: Router) {}
  canActivate(): boolean {
    let token = localStorage.getItem('token');
    if(token){
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
