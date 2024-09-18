import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthenticationResponse } from '../models/authentication-response.interface';
import { catchError, throwError } from 'rxjs';
import { ProblemDetails } from '../models/errors/problem-details.model';
import { RegisterFormData } from '../models/account/register-form-data.model';
import { LoginFormData } from '../models/account/login-form-data.model';
import { ValidationProblemDetails } from '../models/errors/validation-problem-details.model';
import { DateHelper } from '../utils/date.helper';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private httpClient = inject(HttpClient);
  private dateHelper = inject(DateHelper);

  baseUrl = 'https://localhost:7131/api/v1/account';
  login({ email, password }: LoginFormData) {
    return this.httpClient
      .post<AuthenticationResponse>(`${this.baseUrl}/login`, {
        email,
        password,
      })
      .pipe(catchError(this.handleError));
  }

  register({
    firstName,
    lastName,
    dateOfBirth,
    email,
    password,
    confirmPassword,
  }: RegisterFormData) {
    return this.httpClient
      .post(`${this.baseUrl}/register`, {
        firstName,
        lastName,
        dateOfBirth: this.dateHelper.getDateOnlyString(dateOfBirth),
        email,
        password,
        confirmPassword,
      })
      .pipe(catchError(this.handleValidationError));
  }

  logout() {
    return this.httpClient
      .get(`${this.baseUrl}/logout`)
      .pipe(catchError(this.handleError));
  }

  private handleError(errorRes: HttpErrorResponse) {
    if (errorRes.error.title) {
      return throwError(
        () =>
          new ProblemDetails({
            title: errorRes.error.title,
            detail: errorRes.error.detail,
          })
      );
    }

    return throwError(
      () =>
        new ProblemDetails({
          title: 'An unexpected error occurred.',
          detail: 'Please make sure your connection is working properly.',
        })
    );
  }

  private handleValidationError(errorRes: HttpErrorResponse) {
    if (errorRes.error.title) {
      return throwError(
        () =>
          new ValidationProblemDetails({
            title: errorRes.error.title,
            detail: errorRes.error.detail,
            errors: errorRes.error.errors,
          })
      );
    }

    return throwError(
      () =>
        new ValidationProblemDetails({
          title: 'An unexpected error occurred.',
          detail: 'Please make sure your connection is working properly.',
          errors: errorRes.error.errors,
        })
    );
  }
}
