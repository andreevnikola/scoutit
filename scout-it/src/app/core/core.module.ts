import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [LandingPageComponent, HeaderComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [HeaderComponent, LandingPageComponent],
})
export class CoreModule {}
