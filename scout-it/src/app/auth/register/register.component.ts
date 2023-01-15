import { Component } from '@angular/core';
import { AuthenticateService } from '../authenticate.service';
import { IRegistered } from 'src/app/shared/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  password_type: string = "password";
  account_type: string | undefined;
  loading: boolean = false;
  taken: string[] | undefined | null;

  constructor( private authService: AuthenticateService, private router: Router ){ }

  changeAccountType(event: any){
    this.account_type = event.target.value;
  }

  registerHandler(phone_starting:string, phone:string, mail:string, username:string, firstname:string, lastname:string, password:string){
    this.loading = true;

    this.authService.registerAccount(phone_starting, phone, mail, username, firstname, lastname, password, this.account_type!).subscribe({
      next: (data: IRegistered) => {
        this.loading = false;
        sessionStorage.clear();
        localStorage.setItem("key", data.key.toString());
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("firstname", firstname);
        sessionStorage.setItem("lastname", lastname);
        sessionStorage.setItem("phone", phone_starting + phone);
        sessionStorage.setItem("mail", mail);
        sessionStorage.setItem("id", data.id);
        sessionStorage.setItem("profile_picture", data.profile_picture)
        this.router.navigate([`/profile/${data.id}`]);
      },
      error: (err) => {
        this.loading = false;
        this.taken = null;
        if(err.status === 409){
          this.taken = [];
          JSON.parse(err.error.error).forEach((error: string) => {
            this.taken!.push(error.split(" ")[0]);
          });;
        }
        if(this.taken){ return; }
        alert("Something went wrong. Please try again later.")
      }
    });
  }

}
