import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user={localId:"rrrrrrrr",displayName:"ddddddddddddddd"};
  constructor(private auth:AuthService){
this.auth.canAccess();
 if (this.auth.isauthenticated()) {
  //call user details service
  console.log('inside dashboard Subscribe');
  this.auth.details().subscribe({    
    next:data=>{
      this.user.localId=data.users[0].localId;
      this.user.displayName=data.users[0].displayName;
      this.user.localId=data.users[0].localId;
      console.log(this.user.displayName=data.users[0].displayName);
    }
    
  });
  console.log('outside dashboard Subscribe');

 }
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
