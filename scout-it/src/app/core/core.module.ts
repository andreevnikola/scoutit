import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LandingHeaderItemComponent } from './landing-page/landing-header-item/landing-header-item.component';
import { LandingMainItemComponent } from './landing-page/landing-main-item/landing-main-item.component';



@NgModule({
  declarations: [
    LandingPageComponent,
    LandingHeaderItemComponent,
    LandingMainItemComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
