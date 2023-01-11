import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    LandingPageComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [CommonModule, FontAwesomeModule],
  exports: [HeaderComponent, LandingPageComponent, FooterComponent],
})
export class CoreModule {}
