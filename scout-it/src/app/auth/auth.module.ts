import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule } from '@angular/forms';
import { VerifyMailComponent } from './verify-mail/verify-mail.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    VerifyMailComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule
  ],
})
export class AuthModule { }
