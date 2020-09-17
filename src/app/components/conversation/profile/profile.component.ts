import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;
  showSpinner = true;

  constructor(private auth: AuthService,
              private route: ActivatedRoute,
              private chat: ChatService) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.params.id;

    if (userId) {
      this.chat.getUserDetails(userId).subscribe(res => {
        this.showSpinner = false;
        this.user = res;
      });

    }
  }

}
