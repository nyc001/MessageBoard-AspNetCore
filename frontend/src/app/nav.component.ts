import { Component } from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {AuthService} from './auth.service';

@Component({
    selector: 'nav',
    template: `
    
    <div >
        <mat-toolbar color="primary" class="card">
        Message Board <br>
        <button mat-button routerLink="/">Home</button>
        <button mat-button routerLink="/messages">Messages</button>
        <span style="flex:1 1 auto"></span>
        <button mat-button  *ngIf="!auth.isAuthenticated()" routerLink="/login">Login</button>
        <button mat-button routerLink="/register" *ngIf="!auth.isAuthenticated()">Register</button>
        <button mat-button routerLink="/" *ngIf="auth.isAuthenticated()">Hello {{auth.getName()}}</button>
        <button mat-button  *ngIf="auth.isAuthenticated()" (click)="auth.logout()">Logout</button>
        </mat-toolbar>
    </div>
  `,
    styleUrls: ['./app.component.css']
})
export class NavComponent {
    constructor(private auth: AuthService){

    }
}