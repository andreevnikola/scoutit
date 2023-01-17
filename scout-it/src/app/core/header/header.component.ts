import { Component } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  search = faMagnifyingGlass;

  constructor() {}

  toggleHamburger() {
    let navbar = document.querySelector<HTMLElement>('#navbar');
    let header = document.querySelector<HTMLElement>('#header');

    if (navbar!.style.display === 'block') {
      navbar!.style.display = 'none';
      header!.style.flexDirection = 'row';
    } else {
      navbar!.style.display = 'block';
      // navbar!.style.flexDirection = 'column';
      header!.style.flexDirection = 'column';
    }
  }
}
