import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [MenubarModule, RouterLink, ButtonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
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
