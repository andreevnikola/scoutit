import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings/settings.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PublicProfileComponent } from './public-profile/public-profile.component';



@NgModule({
  declarations: [
    SettingsComponent,
    PublicProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    FontAwesomeModule
  ]
})
export class ProfileModule { }
