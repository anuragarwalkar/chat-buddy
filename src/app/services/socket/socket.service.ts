import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import io from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: io.Socket = null;
  userId: string;
  onNewMessage = new Subject<string>();

  constructor() { }

  socketConnectionInit(token: string, userId: string): void {
    if (!token) {
      token = sessionStorage.getItem('access_token');
    }
    this.userId = userId;
    const options = { query: { token, userId } };
    this.socket = io(environment.origin, options);

    this.socket.on('receiveMessage', msg => {
      this.onNewMessage.next(msg);
    });

  }

  endSocketConnection(): void {
    try {
      this.socket.emit('forceDisconnect');
      this.socket = null;
    } catch (error) {
      this.socket = null;
    }
  }

  get isSocketInit(): boolean {
    return this.socket !== null;
  }

  sendMessage(message: string, userId: string): void {
    this.socket.emit('sendMessage', {message, to: userId, from: this.userId});
  }
}
