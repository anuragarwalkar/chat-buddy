import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { SocketService } from 'src/app/services/socket/socket.service';
import * as moment from 'moment';
import { Chat } from 'src/app/models/chat.model';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {
  message: string;
  chatHistory = [] as Chat[];
  showNewChat: boolean;
  recipientId: string;
  recipientUserDetails = {
    username: '',
    email: '',
    fullName: '',
    userId: ''
  };

  constructor(public chat: ChatService,
              private socket: SocketService,
              private auth: AuthService,
              private route: ActivatedRoute,
              private router: Router
              ) { }

  onSubmit(): void {
    const { fullName } = this.auth.getUserDetails;
    const time = moment().format('h:m a');

    this.chatHistory.push({ isSender: true, fullName, createdAt: new Date(), message: this.message });

    this.socket.sendMessage(this.message, this.recipientId);

    this.message = '';
  }

  async ngOnInit(): Promise<any> {
    this.recipientId = this.route.snapshot.params.id;
    this.showNewChat = this.recipientId === 'new';

    this.route.params.subscribe(({ id }) => {
      this.showNewChat = id === 'new';
      this.recipientId = id;
      this.getChatHistory();
    });

    this.socket.onNewMessage.subscribe((res: any) => {
      const { message, username, time, recipientId } = res;
      if (this.recipientId === recipientId) {
        this.chatHistory.push({ isSender: false, fullName: username, createdAt: time, message });
      }
    });

    if (this.chat.getRecipientUserDetails) {
      this.recipientUserDetails = this.chat.getRecipientUserDetails;
    } else {
      this.recipientUserDetails = await this.chat.getUserDetails(this.recipientId).toPromise();
    }

  }

  navigateToUsers(): void {
    this.router.navigate(['conversation', 'users']);
  }

  private getChatHistory(): void {
    if (!this.showNewChat) {
      this.chat.getChatHistory(this.auth.userDetails.userId, this.recipientId).subscribe(res => {
          this.chatHistory = [...res];
      });
    }
  }


}
