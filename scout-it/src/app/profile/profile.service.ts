import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor( private httpClient: HttpClient ) { }

  editAccount(phone:string, mail:string, username:string, fullname: string, password:string | null, file: File | undefined){
    const formData = new FormData(); 
    if(file){
      formData.append("file", file, file.name);
    }
    formData.append("username", username);
    formData.append("pass", password || "unknown");
    formData.append("fullname", fullname);
    formData.append("mail", mail);
    formData.append("phone", phone);
    return this.httpClient.post<any>('http://localhost:8080/api/users/settings/key', formData)
  }

  confirmMail(){
    return this.httpClient.get<any>('http://localhost:8080/api/users/confirm/key')
  }

}
