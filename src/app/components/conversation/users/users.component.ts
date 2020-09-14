import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { SocketService } from 'src/app/services/socket/socket.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  users = [] as User[];
  private ConnectedUserSubscriptionRef: Subscription;
  private DisconnectedUserSubscriptionRef: Subscription;

  constructor(private chat: ChatService,
              private auth: AuthService,
              private router: Router,
              private socket: SocketService
              ) { }

  onUserClick(userId: string, user: User): void {
    this.chat.setRecipientUserDetails(user);
    this.router.navigate(['conversation', userId, 'chat']);
  }

  private usersInit(): void {
    this.chat.getUsers(this.auth.getUserDetails.userId).subscribe(res => {
      this.users = res;
    });
  }

  private connectedUserSubscription(): void {
    this.ConnectedUserSubscriptionRef = this.socket.connectedUserSubscription.subscribe(this.addRemoveUser);
  }

  private disconnectedUserSubscription(): void {
    this.DisconnectedUserSubscriptionRef =  this.socket.disconnectedUserSubscription.subscribe(this.addRemoveUser);
  }

  private addRemoveUser = (user: User): void => {
      for (const curUser of this.users) {
        if (curUser.userId === user.userId) {
          curUser.isOnline = user.isOnline;
          break;
        }
    }
  }

  ngOnInit(): void {
    this.usersInit();
    this.connectedUserSubscription();
    this.disconnectedUserSubscription();
  }

  ngOnDestroy(): void {
    if (this.ConnectedUserSubscriptionRef) {
      this.ConnectedUserSubscriptionRef.unsubscribe();
    }

    if (this.DisconnectedUserSubscriptionRef) {
      this.DisconnectedUserSubscriptionRef.unsubscribe();
    }
  }

}
