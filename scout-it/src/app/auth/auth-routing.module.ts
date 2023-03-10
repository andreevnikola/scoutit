import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerifyMailComponent } from './verify-mail/verify-mail.component';

const routes: Routes = [
  {
    path: 'signin',
    component: LoginComponent
  },
  {
    path: 'join',
    component: RegisterComponent
  },
  {
    path: 'verify/:key/:code',
    component: VerifyMailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
