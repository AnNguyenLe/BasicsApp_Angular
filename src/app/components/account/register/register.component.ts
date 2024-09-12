import { Component, DestroyRef, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { AccountService } from '../../../services/account.service';
import { RegisterFormData } from '../../../models/account/register-form-data.model';
import { ToastModule } from 'primeng/toast';
import { ValidationProblemDetails } from '../../../models/errors/validation-problem-details.model';
import { CalendarModule } from 'primeng/calendar';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    ButtonModule,
    RouterLink,
    RouterOutlet,
    ToastModule,
    CalendarModule,
    ToastModule,
    MessagesModule,
  ],
  providers: [MessageService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private accountService = inject(AccountService);
  private destroyRef = inject(DestroyRef);
  private messageService = inject(MessageService);

  isLoading = signal(false);
  validationErrors = signal([] as string[]);
  messages: Message[] = [];

  // TODO: More accurate validation here
  form = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    dateOfBirth: new FormControl(),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  onSubmit() {
    this.isLoading.set(true);
    this.messages = [];
    const subscription = this.accountService
      .register(this.form.value as RegisterFormData)
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'information',
            summary:
              'Please check your email and click confirm to finish the registration process.',
            detail: 'ACTION REQUIRED',
          });
        },
        error: ({
          title: summary,
          detail,
          errors,
        }: ValidationProblemDetails) => {
          for (const [fieldName, validationErrors] of Object.entries(errors)) {
            if (validationErrors) {
              for (const error of validationErrors) {
                this.messages.push({
                  severity: 'error',
                  summary: fieldName,
                  detail: error,
                });
              }
            }
          }

          this.messageService.add({
            key: 'registrationResult',
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
