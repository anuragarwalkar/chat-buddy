import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private auth: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const response = this.auth.canActivate();
    const isAuth = route.routeConfig.path === 'auth';

    if (!response && !isAuth) {
      this.router.navigate(['/auth']);
      return true;
    }

    if (isAuth && !response || !isAuth && response) {
      return true;
    }

    if (isAuth && response) {
      this.router.navigate(['/conversation/new/chat']);
    }

    return false;
  }
}
