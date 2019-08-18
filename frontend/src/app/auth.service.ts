import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {
    BASE_URL = "https://192.168.100.129:5001/auth";

    TOKEN_KEY = "token";
    NAME_KEY = "name";
    
    

    constructor(private http: HttpClient, private router: Router){

    }

    register(user){
        delete user.passWord2;
        this.http.post(this.BASE_URL+"/register", user).subscribe(res => {
            this.authenticateUser(res);
            
        });
    }

    login(user){
        this.http.post(this.BASE_URL+"/login", user).subscribe(res =>{
            this.authenticateUser(res);
        });
    }

    authenticateUser(user){
        var authResponse = user;
            if (!authResponse.token){
                return;
            }


            localStorage.setItem(this.TOKEN_KEY, authResponse.token);
            localStorage.setItem(this.NAME_KEY, authResponse.name);
            this.router.navigate(['/']);
    }

    

    getName(){
        return localStorage.getItem(this.NAME_KEY)
    }

    isAuthenticated(){
        return localStorage.getItem(this.TOKEN_KEY)
    }

    tokenHeader(){
        var header = new HttpHeaders({'Authorization': 'Bearer '+localStorage.getItem(this.TOKEN_KEY)});
        let headers = {headers: header};
        return headers; 
    }

    logout(){
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.NAME_KEY);
        this.router.navigate(['/']);
    }
}