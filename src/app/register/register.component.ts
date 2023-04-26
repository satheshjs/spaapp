    import { Component, OnInit } from '@angular/core';
    import { AuthService } from '../_services/auth.service';

    @Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
    })
    export class RegisterComponent implements OnInit {

    formdata  ={name:"",email:"",password:""};

    submit=false;
    errorMessage="";
    loading=false;
    constructor(private auth:AuthService){
  
    }
    ngOnInit(): void {
      this.auth.canAuthenticate();
    }

    onSubmit(){
    console.log('registerclicked');
    this.loading=true;
    console.log(this.formdata);
    this.auth.register(this.formdata.name,this.formdata.email,this.formdata.password)
    .subscribe({
    next:data=>{
    //store token from repsonse data
    this.auth.storeToken(data.idToken);
    console.log('token store completed token value is '+ data.idToken);
    this.auth.canAuthenticate();
    },
    error:data=>{
     if (data.error.error.message=="INVALID_EMAIL") 
      {
      this.errorMessage="Invalid email!";
      } 
     else if (data.error.error.message=="EMAIL_EXISTS")
     {
      this.errorMessage="Email Already Exists!";
     }
     else
     {
      this.errorMessage="Unknown Error Occured!";
     }
  }
  }).add(()=>{
    this.loading=false;
    console.log('register completed');
  })
  }
}
