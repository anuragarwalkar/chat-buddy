import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import io from 'socket.io-client';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: io.Socket = null;
  userId: string;
  newMessageSubscription = new Subject<string>();
  connectedUserSubscription = new Subject<User>();
  disconnectedUserSubscription = new Subject<User>();

  constructor() { }

  socketConnectionInit(token: string, userId: string): void {
    if (!token) {
      token = sessionStorage.getItem('access_token');
    }
    this.userId = userId;
    const options = { query: { token, userId } };
    this.socket = io(environment.origin, options);

    this.socket.on('receiveMessage', (msg: any) => {
      this.newMessageSubscription.next(msg);
    });

    this.socket.on('connectedUser', (res: User) => {
      this.connectedUserSubscription.next(res);
    });

    this.socket.on('diconnectedUser', (res: User) => {
      this.connectedUserSubscription.next(res);
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
