import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '../../core/@services/message.service';

@Component({
  selector: 'user-message',
  templateUrl: './message-model.component.html',
  styleUrls: ['./message-model.component.css']
})
export class MessageModelComponent  {

  @Input() message: MessageModel = new MessageModel();
  constructor(private messageService: MessageService) { }

  clearMessage() {
      this.messageService.clearMessage();
  }

}


export class MessageModel {
  class: string;
  text: string;
}
