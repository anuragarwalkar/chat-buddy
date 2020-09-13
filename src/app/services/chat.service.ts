import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { Chat } from '../models/chat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private _recipientUuserDetails: User;

  constructor(private http: HttpClient) { }

  getUsers(userId: string): Observable<User[]> {
    return this.http.get<{success: boolean, data: User[]}>(`${environment.origin}/api/v1/user/${userId}`)
    .pipe(map((res: {success: boolean, data: User[]}) => {
      return res.data;
    }));
  }

  getChatHistory(sender: string, recipient: string): Observable<Chat[]> {
    return this.http.post<{success: boolean, data: Chat[]}>(`${environment.origin}/api/v1/chat/history`, {sender, recipient})
    .pipe(map((res: {success: boolean, data: Chat[]}) => {
      return res.data;
    }));
  }

  setRecipientUserDetails(user: User): void {
    this._recipientUuserDetails = user;
  }

  get getRecipientUserDetails(): User {
    return this._recipientUuserDetails;
  }

  getUserDetails(userId: string): Observable<User> {
    return this.http.get<{success: boolean, data: User}>(`${environment.origin}/api/v1/user/single/${userId}`)
    .pipe(map((res: {success: boolean, data: User}) => {
      return res.data;
    }));
  }

}
