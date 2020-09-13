import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users = [] as User[];

  constructor(private chat: ChatService, private auth: AuthService, private router: Router) { }

  onUserClick(userId: string, user: User): void {
    this.chat.setRecipientUserDetails(user);
    this.router.navigate(['conversation', userId, 'chat']);
  }

  ngOnInit(): void {

    this.chat.getUsers(this.auth.getUserDetails.userId).subscribe(res => {
        this.users = res;
    });
  }

}
