import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticateService } from '../authenticate.service';

@Component({
  selector: 'app-verify-mail',
  templateUrl: './verify-mail.component.html',
  styleUrls: ['./verify-mail.component.css']
})
export class VerifyMailComponent {
  firstname: string = "Unknown";
  loading: boolean = true;
  user_id: string = "unknown";
  error: boolean = false;
  constructor( private authService: AuthenticateService, private route: ActivatedRoute ){
    this.authService.verifyMail(this.route.snapshot.paramMap.get('key')!, this.route.snapshot.paramMap.get('code')!).subscribe({
      next: (data) => {
        this.loading = false;
        this.user_id = data.id;
        this.firstname = data.firstname;
        sessionStorage.setItem("verified", "true");
      },
      error: (err) => {
        this.loading = false;
        if(err.status === 500){
          alert("Something went wrong! Try again later!")
          return;
        }
        this.error = true;
      }
    });
  }
  resendVerificationHandler(){
    this.authService.confirmMail(this.route.snapshot.paramMap.get('key')!).subscribe({
      next: (data) => {
        this.loading = false;
        alert("You have recieved new verification e-mail");
      },
      error: (err) => {
        this.loading = false;
        alert("Something went wrong! Try again later!")
      }
    });
  }
}
