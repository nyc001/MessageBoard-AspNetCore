import { Component } from '@angular/core';
import {MessageComponent} from './messages.component';
import {CreateMessageComponent} from './create.messages.component';


@Component({
    selector: 'home',
    template: `
    
    <create-message></create-message><message></message>
  `,
    styleUrls: ['./app.component.css']
})
export class HomeComponent {
    
}