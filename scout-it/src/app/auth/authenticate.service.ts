import { Injectable } from '@angular/core';
import { IRegistered, IUser } from 'src/app/shared/interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor( private httpClient: HttpClient ) { }

  registerAccount(phone_starting:string, phone:string, mail:string, username:string, firstname:string, lastname:string, password:string, type:string){

    return this.httpClient.post<IRegistered>('http://localhost:8080/api/users/register', {
      username: username,
      pass: password,
      fullname: firstname + " " + lastname,
      mail: mail,
      phone: phone_starting + phone,
      type: type
    })
  }

  signIn(phone_starting:string, phone:string, password:string, type:string){

    return this.httpClient.post<IUser>('http://localhost:8080/api/users/login', {
      pass: password,
      phone: phone_starting + phone,
      type: type
    })
  }

  verifyMail(key: string, code: string){
    return this.httpClient.get<any>(`http://localhost:8080/api/users/verify/${key}/${code}`)
  }

  confirmMail(key: string){
    return this.httpClient.get<any>(`http://localhost:8080/api/users/confirm/${key}`)
  }

  username: string | null = sessionStorage.getItem("username");

  get isLogged(){
    return this.username !== null
  }

}
