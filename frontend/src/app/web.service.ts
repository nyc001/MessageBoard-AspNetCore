import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material'
import {Subject} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable()
export class WebService {

    BASE_URL = "https://192.168.100.129:5001/api/";

    private messagesStore: any;

    private messageSubject = new Subject();

    messages = this.messageSubject.asObservable();

    constructor(private http: HttpClient, private sb: MatSnackBar, private au:AuthService) {
        this.getMessages(null);
    }

    getMessages(user) {
        
        user = (user) ? '/' + user : '';
        this.http.get(this.BASE_URL + "messages" + user).subscribe(response => {
            this.messagesStore = response;
            this.messageSubject.next(this.messagesStore);
        },error => {
            this.handleError("Unable to connect to server");
        });

    }



    async postMessage(message) {

        try {
            var response = await this.http.post(this.BASE_URL + "messages", message).toPromise();
            this.getMessages(null);
            this.messageSubject.next(this.messagesStore);
        } catch (error) {
            this.handleError("Unable to post data");
        }
    }

    getUser(){
        return this.http.get(this.BASE_URL+"users/me", this.au.tokenHeader()).subscribe();
    }

    handleError(error) {
        console.error("this is the error, "+error);
        this.sb.open(error, 'Close', { duration: 2000 });
    }
}