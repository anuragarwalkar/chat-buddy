import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private auth: AuthService) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const response = this.auth.canActivate();

    if (!response) {
      this.router.navigate(['/auth']);
    }

    return response;
  }
}
