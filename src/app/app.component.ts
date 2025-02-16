import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { NavComponent } from './components/nav/nav.component';
import { AppStore } from './stores/app.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule, RouterLink, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private appStore = inject(AppStore);
  ngOnInit(): void {
    this.appStore.loadUser();
  }
}
