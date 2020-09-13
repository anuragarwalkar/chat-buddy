import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public auth: AuthService, private router: Router) { }

  onLogOut(): void {
    this.auth.logout();
  }

  onGoToProfile(userId: string): void {
    this.router.navigate(['conversation', userId, 'profile'])
  }

  ngOnInit(): void {
  }

}
