import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/auth/login.component';
import { MaterialModule } from './shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './components/conversation/users/users.component';
import { ProfileComponent } from './components/conversation/profile/profile.component';
import { ChatsComponent } from './components/conversation/chats/chats.component';
import { ConversationComponent } from './components/conversation/conversation.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './services/auth/http-interceptor.service';
import { ChatMessageComponent } from './components/conversation/chats/chat-message/chat-message.component';
import { CustomName } from './shared/custom/pipe/name.pipe';
import { UserComponent } from './components/conversation/users/user/user.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    UsersComponent,
    ProfileComponent,
    ChatsComponent,
    ConversationComponent,
    ChatMessageComponent,
    CustomName,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
