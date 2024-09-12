import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AccountService } from '../../../services/account.service';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';
import { MessageService } from 'primeng/api';
import { ProblemDetails } from '../../../models/errors/problem-details.model';
import { LoginFormData } from '../../../models/account/login-form-data.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    RouterLink,
    RouterOutlet,
    LoadingSpinnerComponent,
  ],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private destroyRef = inject(DestroyRef);
  private accountService = inject(AccountService);
  private messageService = inject(MessageService);

  isLoading = signal(false);

  form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit() {
    const { email, password } = this.form.value;

    if (
      !email ||
      email.trim().length === 0 ||
      !password ||
      password.trim().length === 0
    ) {
      return;
    }

    this.isLoading.set(true);
    const subscription = this.accountService
      .login(this.form.value as LoginFormData)
      .subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: `Welcome back ${res.firstName} ${res.lastName}!`,
            detail: 'Login Successfully.',
          });
        },
        error: ({ title: summary, detail }: ProblemDetails) => {
          this.messageService.add({
            severity: 'error',
            summary,
            detail,
          });
        },
      });

    this.isLoading.set(false);

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
