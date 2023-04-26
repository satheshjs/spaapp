import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {  

    constructor(private router:Router, private http:HttpClient) { }
    isauthenticated():boolean{
    if(sessionStorage.getItem('token')!==null){
        return true;
    }
    return false;
    }

    canAccess(){
    if (!this.isauthenticated()) {
      //redirect to login page
      this.router.navigate(['/login']);
    }
    }

    canAuthenticate(){
      if (this.isauthenticated()) {
        //redirect to dashboard
        this.router.navigate(['/dashboard']);
      }
    }
    register(name:string,email:string,password:string){
    //send data to register API request(firebase register api)
    return this.http
    .post<{idToken:string}>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAPjs6_4Yxj-vZpIM4_Vna8ATAqjg_abjE'
    ,{displayName:name,email,password});
    }

   
      login(email:string,password:string){
      //send data to Login API request(firebase Login api)
      return this.http
      .post<{idToken:string}>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAPjs6_4Yxj-vZpIM4_Vna8ATAqjg_abjE'
      ,{email,password});
      }
      storeToken(token:string){
        sessionStorage.setItem('token',token);
    
        }

        details(){
          let token = sessionStorage.getItem('token');
          console.log('inside details fun');
          console.log (sessionStorage.getItem('token'));
          return this.http
          .post<{users:Array<{localId:string,displayName:string}>}>('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAPjs6_4Yxj-vZpIM4_Vna8ATAqjg_abjE'
          ,{idToken:token}
          );
          console.log (sessionStorage.getItem('token'));
          }
          removeToken(){
            sessionStorage.removeItem('token');
          }
    

} 

