import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './footer/footer.component';
import { LandingCategoryComponent } from './landing-page/landing-category/landing-category.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    LandingPageComponent,
    HeaderComponent,
    FooterComponent,
    LandingCategoryComponent,
  ],
  imports: [CommonModule, FontAwesomeModule, BrowserAnimationsModule],
  exports: [HeaderComponent, LandingPageComponent, FooterComponent],
})
export class CoreModule {}
