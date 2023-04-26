import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formdata  ={email:"",password:""};

  submit=false;
  errorMessage="";
  loading=false;
  constructor(private auth:AuthService){
    
  }
    ngOnInit(): void {
      this.auth.canAuthenticate();
    }
  
    onSubmit(){
    console.log('Login Clicked');
    this.loading=true;
    console.log(this.formdata);
    //call login service
    this.auth.login(this.formdata.email,this.formdata.password)
    .subscribe({
    next:data=>{
    //store token from repsonse data
    console.log('inside subscribe');
    this.auth.storeToken(data.idToken);
    console.log('token store completed token value is '+ data.idToken);
    this.auth.canAuthenticate();
    console.log('inside token');
    },
    error:data=>{
     if (data.error.error.message=="INVALID_EMAIL" || data.error.error.message=="INVALID_PASSWORD" ) 
      {
      this.errorMessage="Invalid Credentials !";
      } 
     else
     {
      this.errorMessage="Unknown Error Occured! during login form";
     }
  }
  }).add(()=>{
    this.loading=false;
    console.log('Login Process completed');
  })
    }
}
