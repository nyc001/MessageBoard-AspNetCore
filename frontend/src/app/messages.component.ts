import { Component } from '@angular/core';
import {WebService} from './web.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'message',
    template: `
    
    <div *ngFor="let message of (webService.messages | async).reverse() ">
        <mat-card style="margin:50px">
            <mat-card-header>
            <div mat-card-avatar ></div>
            <mat-card-title>{{message.text}}</mat-card-title>
            <mat-card-subtitle [routerLink]="['/messages',message.owner]" style="cursor: pointer">{{message.owner}}</mat-card-subtitle>
            <mat-card-subtitle>{{message.id}}</mat-card-subtitle>

            </mat-card-header>
        </mat-card>
        
    </div>
  `,
    styleUrls: ['./app.component.css']
})
export class MessageComponent {
    
    constructor(private webService:WebService,private route:ActivatedRoute){}
    // async ngOnInit() {
    //     //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //     //Add 'implements OnInit' to the class.
    //     // await this.webService.getMessages().then(response=> this.messages = response);
        
    //     this.isDataAvailable = true;
    // }
    // messages = [{ text: 'what\'s up', owner: 'Tim' }, { text: 'not much', owner: 'Jen' }];
    // messages: any;
    // messages:any;
    ngOnInit() {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        // setInterval(()=>{this.webService.getMessages()},10000);
        var user = this.route.snapshot.params.name;
        this.webService.getMessages(user);
        this.webService.getUser();
        console.log(this.webService.getUser());
        console.log("message component");
        // this.webService.messages.subscribe(messages => {
        //     this.messages = messages;
        // });
    }
}