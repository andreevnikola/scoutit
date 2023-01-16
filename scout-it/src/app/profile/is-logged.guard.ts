import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticateService } from '../auth/authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedGuard implements CanActivate {

  constructor(private authService: AuthenticateService, private router: Router){ }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authService.isLogged){ return true; }
    const returnUrl = state.url;
    return this.router.createUrlTree(['auth/signin'], { queryParams: { returnUrl } });
  }
  
}
