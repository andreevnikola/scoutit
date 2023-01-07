import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  password_type: string = "password";
  account_type: string | undefined;

  changeAccountType(event: any){
    this.account_type = event.target.value;
  }

  registerHandler(phone_starting:string, phone:string, mail:string, username:string, firstname:string, lastname:string, password:string){

  }

}
