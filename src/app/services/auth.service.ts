import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthSignInModel, AuthSignUpModel } from '../models/auth.model';
import jwt_decode from 'jwt-decode';
import { SocketService } from './socket/socket.service';
import { User } from '../models/user.model';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userDetails: { fullName: string; userId: string } = null;
  isMobile: boolean;

  constructor(private http: HttpClient,
              private socket: SocketService,
              private router: Router,
              private deviceService: DeviceDetectorService
              )
              {
                this.isMobile = this.deviceService.isMobile();
              }

  private mapCallback = (response: { success: boolean, data: any }): { success: boolean, data: any } => {
    const { success, data: { token, user } } = response;
    if (success) {
      this.setUserDetailsAndNavigate(token, user);
    }
    return response;
  }

  setUserDetailsAndNavigate(token: string, user: User): void {
      this.setUserDetails(user);
      this.setAccessToken(token);
      this.socket.socketConnectionInit(token, user.userId);
      this.navigateToChats();
  }

  navigateToChats(): void {
    const navigationRoute = this.isMobile ? 'users' : 'new/chat';
    this.router.navigate([`/conversation/${navigationRoute}`]);
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

  private setUserDetails(userDetails: {fullName: string, userId: string}): void {
      this.userDetails = userDetails;
  }

  get getUserDetails(): any {
    if (this.userDetails === null) {
      try {
        const {user} = jwt_decode(this.getAccessToken);
        this.userDetails = user;
        if (!this.socket.isSocketInit) {
          this.socket.socketConnectionInit(this.getAccessToken, this.userDetails.userId);
        }
      } catch (error) {
        this.userDetails = null;
      }
    }

    return this.userDetails;
  }

  logout(): void {
    this.userDetails = null;
    sessionStorage.removeItem('access_token');
    this.socket.endSocketConnection();
    this.router.navigate(['/']);
  }

  canActivate(): boolean {
    return this.getAccessToken !== null;
  }
}

