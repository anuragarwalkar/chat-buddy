import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConversationComponent } from './components/conversation/conversation.component';
import { LoginComponent } from './components/auth/login.component';
import { ProfileComponent } from './components/conversation/profile/profile.component';
import { ChatsComponent } from './components/conversation/chats/chats.component';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { UsersComponent } from './components/conversation/users/users.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'auth' },
  { path: 'auth', component: LoginComponent, canActivate: [AuthGuardService] },
  {
    path: 'conversation', component: ConversationComponent, children: [
      { path: ':id/profile', component: ProfileComponent },
      { path: ':id/chat', component: ChatsComponent },
      { path: 'users', component: UsersComponent}
    ], canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
