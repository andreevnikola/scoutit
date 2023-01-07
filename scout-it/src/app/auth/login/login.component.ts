import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  password_type: string = "password";
  account_type: string | undefined;
  loading: boolean = false;
  not_found: boolean = false;

  constructor( private authService: AuthenticateService, private router: Router ){ }

  changeAccountType(event: any){
    this.account_type = event.target.value;
  }

  signinHandler(phone_starting:string, phone:string, password:string){
    this.loading = true;
    this.not_found = false;

    this.authService.signIn(phone_starting, phone, password, this.account_type!).subscribe({
      next: (data: any) => {
        this.loading = false;
        localStorage.setItem("key", data.key.toString());
        sessionStorage.setItem("username", data.name);
        sessionStorage.setItem("firstname", data.firstname);
        sessionStorage.setItem("lastname", data.lastname);
        sessionStorage.setItem("phone", phone_starting + phone);
        sessionStorage.setItem("mail", data.mail);
        sessionStorage.setItem("id", data.id);
        this.router.navigate([`/profile/${data.id}`]);
      },
      error: (err) => {
        this.loading = false;
        if(err.status === 409){
          this.not_found = true;
        }
        if(this.not_found){ return; }
        alert("Something went wrong. Please try again later.")
      }
    });
  }
}
