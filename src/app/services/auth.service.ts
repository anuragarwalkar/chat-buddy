import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthSignInModel, AuthSignUpModel } from '../models/auth.model';
import { ChatService } from './chat.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient, private chat: ChatService, private router: Router) { }

  private mapCallback = (response: { success: boolean, data: any }): { success: boolean, data: any } => {
    const { success, data: { token } } = response;
    if (success) {
      this.setAccessToken(token);
      this.chat.socketConnectionInit(token);
      this.router.navigate(['/conversation/chat']);
    }
    return response;
  }

  signUp(body: AuthSignUpModel): Observable<{ success: boolean, data: AuthSignUpModel }> {
    return this.http.post<{ success: boolean, data: AuthSignUpModel }>(`${environment.origin}/api/auth/sign-up`, body)
      .pipe(map(this.mapCallback));
  }

  signIn(body: AuthSignUpModel): Observable<{ success: boolean, data: AuthSignInModel }> {
    return this.http.post<{ success: boolean, data: AuthSignInModel }>(`${environment.origin}/api/auth/sign-in`, body)
      .pipe(map(this.mapCallback));
  }

  private setAccessToken(token: string): void {
    sessionStorage.setItem('access_token', token);
  }

  private get getAccessToken(): string {
    return sessionStorage.getItem('access_token');
  }

  canActivate(): boolean {
    return this.getAccessToken !== null;
  }
}

