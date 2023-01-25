import { Component } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { AuthenticateService } from 'src/app/auth/authenticate.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    // Each unique animation requires its own trigger. The first argument of the trigger function is the name
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(90deg)' })),
      transition('rotated => default', animate('150ms ease-out')),
      transition('default => rotated', animate('150ms ease-in')),
    ]),
  ],
})
export class HeaderComponent {
  search = faMagnifyingGlass;

  constructor(public authService: AuthenticateService) {}

  toggleHamburger() {
    this.rotate();

    let navbar = document.querySelector<HTMLElement>('#navbar');
    let header = document.querySelector<HTMLElement>('#header');

    if (navbar!.style.display === 'flex') {
      navbar!.style.display = 'none';
      header!.style.flexDirection = 'row';
    } else {
      navbar!.style.display = 'flex';
      navbar!.style.flexDirection = 'column';
      header!.style.flexDirection = 'column';
    }
    if (screen.width > 1080) {
      navbar!.style.display = 'flex';
      navbar!.style.flexDirection = 'row';
    }
  }

  state: string = 'default';
  rotate() {
    this.state = this.state === 'default' ? 'rotated' : 'default';
  }
}
