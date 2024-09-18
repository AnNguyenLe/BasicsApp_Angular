import { Component, computed, inject, signal } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { DropdownModule } from 'primeng/dropdown';
import { AppStore } from '../../../stores/app.store';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [DropdownModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  private accountService = inject(AccountService);
  private appStore = inject(AppStore);

  username = computed(
    () => `${this.appStore.user()?.firstName} ${this.appStore.user()?.lastName}`
  );

  accountOptions = [
    { label: 'Profile', value: 'profile' },
    { label: 'Settings', value: 'settings' },
    { label: 'Logout', value: 'logout' },
  ];

  onOptionSelect(event: any) {
    if (event.value === 'logout') {
      this.appStore.logoutUser();
    }
  }
}
