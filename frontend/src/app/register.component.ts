import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from './auth.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./app.component.css']
})
export class RegisterComponent {
    form;

    constructor(private fb:FormBuilder, private au: AuthService){
        this.form = fb.group({
            firstName : ["", Validators.required],
            lastName : ["",Validators.required],
            email: ["",[Validators.required, emailValid()]],
            passWord1: ["",Validators.required],
            passWord2: ["",Validators.required]
        }, {validator : sameFields('passWord1', 'passWord2')});
    }

    onSubmit(){
        console.log(this.form.errors);
        console.log(this.form.value);
        this.au.register(this.form.value);
    }

    
}

function sameFields(field1, field2){
        
    return  form => {
        if (form.controls[field1].value !== form.controls[field2].value)
            return {mismatchField : true};
        else
            return {mismatchField : false};
    }
}

function emailValid(){
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return control =>{
        return emailRegex.test(control.value)? null: {invalidEmail: true}
    }
}