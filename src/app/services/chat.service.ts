import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import io from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: io.Socket;

  constructor() { }

  socketConnectionInit(token: string = null): void {
    if (!token) {
      token = sessionStorage.getItem('access_token');
    }
    const options = { query: { token } };
    this.socket = io(environment.origin, options);
  }

  sendMessage(msg: string): void {
    this.socket.emit('', { message: msg });
  }

  onNewMessage(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('', msg => {
        observer.next(msg);
      });
    });
  }
}
