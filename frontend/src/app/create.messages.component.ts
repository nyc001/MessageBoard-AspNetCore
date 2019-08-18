import { Component } from '@angular/core';
import {WebService} from './web.service';

@Component({
    selector: 'create-message',
    template: `
    <div class="example-container" >
        
            <div class="form-group">
                <label for="owner">Owner ID:</label>
                <input type="text" class="form-control" [(ngModel)]="message.owner">
            </div>
            <div class="form-group">
                <label for="text">Text:</label>
                <input type="text" class="form-control" [(ngModel)]="message.text">
            </div>
            
            <button (click)="post()" class="btn btn-default" >Submit</button>
        
    </div>
  `,
    styleUrls: ['./app.component.css']
})
export class CreateMessageComponent {
    
    message = {
        owner : "hh",
        text : ""
    };
    
    constructor(private webService:WebService){}
    
    post(){
        console.log(this.message);
        this.webService.postMessage(this.message);
        this.message.text = "";
    }
}