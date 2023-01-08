import { Component } from '@angular/core';
import {
  faUserNinja,
  faUserTie,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent {
  icons = {
    ninja: faUserNinja,
    employer: faUserTie,
  };

  constructor() {}
}
