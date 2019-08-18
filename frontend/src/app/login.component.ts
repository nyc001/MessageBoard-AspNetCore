import { Component, OnInit } from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from './auth.service';

@Component({
    selector: 'login',
    template: `
    
    <mat-card>
        
            <mat-form-field>
            <input matInput placeholder="Email" type="email" [(ngModel)]="loginData.email">
            </mat-form-field>
            <br>
            <mat-form-field>
            <input matInput placeholder="Password" type="password" [(ngModel)]="loginData.password">
            </mat-form-field>
            <br>
            <button mat-raised-button color="primary" (click)="onSubmit()">Register</button>
       
    </mat-card>
  `,
    styleUrls: ['./app.component.css']
})
export class LoginComponent implements OnInit  {
    loginData = {
        email: "",
        password: ""
    }
    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }
    
    constructor( private au: AuthService){
        
    }

    onSubmit(){
        console.log(this.loginData);
        this.au.login(this.loginData);
    }
}

