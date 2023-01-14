import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { faCamera, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  password_type: string = "password";
  account_type: string | undefined;
  loading: boolean = false;
  taken: string[] | undefined | null;
  editPhoto = faCamera;
  edit = faEdit;
  changePassword: boolean = false;
  username_storage = sessionStorage.getItem("username");
  mail_storage = sessionStorage.getItem("mail");
  firstname_storage = sessionStorage.getItem("firstname");
  lastname_storage = sessionStorage.getItem("lastname");
  phone_storage = sessionStorage.getItem("phone");
  phone_country_code: any = "";
  phone_widthout_country_code: string = "";
  choosen_file: File | undefined;
  file: File | undefined;
  url: string | ArrayBuffer | null | undefined = sessionStorage.getItem("profile_picture") || "./assets/images/avatar.png";

  @ViewChild('form') form!: NgForm;

  constructor( private profileService: ProfileService, private router: Router ){
    this.phone_country_code = this.phone_storage!.split("").length === 13 ? this.phone_storage!.split("").map((letter, i) => { return i <= 3 ? letter : null }) : this.phone_storage!.split("").length === 12 ? this.phone_storage!.split("").map((letter, i) => { return i <= 2 ? letter : null }) : null;
    this.phone_country_code = this.phone_country_code.join("");
    this.phone_widthout_country_code = this.phone_storage?.replace(this.phone_country_code, "")!;
  }

  updateAccount(phone_starting:string, phone_ending:string, mail:string, username:string, firstname:string, lastname:string){
    let phone = phone_starting + phone_ending;
    let fullname = firstname + " " + lastname;
    this.loading = true;
    this.taken = [];
    this.profileService.editAccount(phone, mail, username, fullname, this.form.controls['password']?.getRawValue(), this.file).subscribe({
      next: (data) => {
        this.loading = false;
        sessionStorage.setItem("mail", mail);
        sessionStorage.setItem("phone", phone);
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("firstname", firstname);
        sessionStorage.setItem("lastname", lastname);
        this.username_storage = username;
        this.mail_storage = mail;
        this.firstname_storage = firstname;
        this.lastname_storage = lastname;
        this.phone_storage = phone;
        if( this.file ){ sessionStorage.setItem("profile_picture", data.url); this.url = data.url; this.file = undefined; }
      },
      error: (err) => {
        this.loading = false;
        if(err.status === 409){
          this.taken = err.status.taken;
        }
        alert("Something went wrong!")
      }
    });
  }

  resetChangesHandler(){
    this.form.controls['username'].setValue(this.username_storage);
    this.form.controls['firstname'].setValue(this.firstname_storage);
    this.form.controls['lastname'].setValue(this.lastname_storage);
    this.form.controls['mail'].setValue(this.mail_storage);
    this.form.controls['phone'].setValue(this.phone_widthout_country_code);
    this.form.controls['phone_starting'].setValue(this.phone_country_code);
    this.url = sessionStorage.getItem("profile_picture") || "./assets/images/avatar.png";
    this.file = undefined;
    this.choosen_file = undefined;
  }

  fileChoosen(event: any){
    this.file = event.target.files[0];
    var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			this.url = reader.result; 
		}
  }

}
