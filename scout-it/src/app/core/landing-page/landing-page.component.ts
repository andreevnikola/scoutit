import { Component } from '@angular/core';
import {
  faDatabase,
  faServer,
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
    database: faDatabase,
  };

  constructor() {}
}
