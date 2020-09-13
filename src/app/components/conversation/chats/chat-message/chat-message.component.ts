import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {
  @Input() fullName: string;
  @Input() message: string;
  @Input() isSender = false;
  @Input() date: string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
