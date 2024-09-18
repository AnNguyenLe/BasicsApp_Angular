import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { AppStore } from '../../stores/app.store';
import { UserComponent } from "../account/user/user.component";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [MenubarModule, RouterLink, ButtonModule, UserComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  appStore = inject(AppStore);

  navBarItems = signal([
    {
      label: 'Industries',
      items: [
        {
          label: 'Defense',
        },
        {
          label: 'Logistics',
        },
        {
          label: 'Analytics',
        },
      ],
    },
    {
      label: 'Consulting',
    },
    {
      label: 'Support',
    },
    {
      label: 'About Us',
    },
  ]);
}
