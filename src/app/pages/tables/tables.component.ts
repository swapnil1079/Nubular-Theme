import { Component } from '@angular/core';
import { MessageService } from '../../core/@services/message.service';
import { Subscription } from 'rxjs/Subscription';
import { MessageModel } from '../../shared/message-model/message-model.component';

@Component({
  selector: 'ngx-tables',
  template: `<user-message [message]="message"></user-message><router-outlet></router-outlet>`,
  styleUrls: ['tables.css']
})
export class TablesComponent {
  subscription: Subscription;
  message: MessageModel;

  constructor(private messageService: MessageService) {

    this.subscription = this.messageService.getMessage().subscribe(message => {
      this.message = message;
      setTimeout(() => {
        this.messageService.clearMessage()
      }, 5000)
    });

  }
}
