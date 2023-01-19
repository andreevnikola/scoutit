import { Component } from '@angular/core';
import { faSearchengin } from '@fortawesome/free-brands-svg-icons';
import {
  faDatabase,
  faHandHoldingDollar,
  faShieldHalved,
  faUserNinja,
  faUserTie,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-landing-category',
  templateUrl: './landing-category.component.html',
  styleUrls: ['./landing-category.component.css'],
})
export class LandingCategoryComponent {
  icons = {
    ninja: faUserNinja,
    employer: faUserTie,
    database: faDatabase,
    money: faHandHoldingDollar,
    shield: faShieldHalved,
    search: faSearchengin,
  };

  constructor() {}
}
