import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { MessageModel } from '../../shared/message-model/message-model.component';

@Injectable()
export class MessageService {
    private subject = new Subject<MessageModel>();

    showSuccess(message: string) {
        this.subject.next({ text: message, class: 'success' });
    }

    showError(message: string) {
        this.subject.next({ text: message, class: 'danger' });
    }

    clearMessage() {
        this.subject.next({ text: '', class: '' });
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}



