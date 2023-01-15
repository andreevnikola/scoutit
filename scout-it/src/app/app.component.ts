import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'scout-it';
  constructor( private httpClient: HttpClient ){
    if(sessionStorage.getItem("phone")){ return; }
    this.httpClient.get<any>('http://localhost:8080/api/users/authenticate/key').subscribe({
      next: (data) => {
        sessionStorage.setItem("id", data.id);
        sessionStorage.setItem("phone", data.phone);
        sessionStorage.setItem("mail", data.mail);
        sessionStorage.setItem("username", data.username);
        sessionStorage.setItem("firstname", data.fullname.split(" ")[0]);
        sessionStorage.setItem("lastname", data.fullname.split(" ")[1]);
        sessionStorage.setItem("profile_picture", data.url);
        if(data.verified){ sessionStorage.setItem("verified", data.verified); }
      },
      error: (err) => {
        alert('Something went wrong. Please try again later.');
      }
    });
  }
}
