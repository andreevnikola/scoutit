import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLoggedGuard } from './is-logged.guard';
import { PublicProfileComponent } from './public-profile/public-profile.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [ IsLoggedGuard ]
  },
  {
    path: ':id',
    component: PublicProfileComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
