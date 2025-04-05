import { Component } from '@angular/core';
import { HeaderComponent } from '../common/header/header.component';
import { SidenavComponent } from '../common/sidenav/sidenav.component';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, SidenavComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  constructor(private router: Router) {}

  navigateToUrl(event:string) {
    this.router.navigateByUrl(event);
  }

}
