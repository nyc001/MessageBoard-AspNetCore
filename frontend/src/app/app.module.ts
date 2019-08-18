import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatSnackBarModule, MatInputModule, MatRippleModule, MatFormFieldModule, MatOptionModule, MatSelectModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {WebService} from './web.service';
import {AuthService} from './auth.service';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MessageComponent} from './messages.component';
import {CreateMessageComponent} from './create.messages.component';
import {NavComponent} from './nav.component';
import {HomeComponent} from './home.component';
import {RegisterComponent} from './register.component';
import {LoginComponent} from './login.component';


var routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'messages',
    component: MessageComponent
  },
  {
    path:'messages/:name',
    component: MessageComponent
  },
  {
    path:'register',
    component: RegisterComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
];

@NgModule({
  declarations: [
    AppComponent, 
    MessageComponent,
    CreateMessageComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatCardModule,
    MatToolbarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    RouterModule.forRoot(routes),
    MatFormFieldModule,
    MatInputModule, 
    MatRippleModule,
    MatOptionModule,
    MatSelectModule
  ],
  exports:[
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
  ],
  providers: [WebService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
