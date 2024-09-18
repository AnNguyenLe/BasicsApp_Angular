import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { AppUser } from '../models/app-user.model';
import { AuthenticationResponse } from '../models/authentication-response.interface';
import { inject } from '@angular/core';
import { AccountService } from '../services/account.service';

type AppState = {
  user: AppUser | null;
};

const initialState: AppState = {
  user: null,
};

export const APP_USER_LOCAL_STORAGE_KEY = 'app-user';

export const AppStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, accountService = inject(AccountService)) => ({
    setUser(authRes: AuthenticationResponse) {
      const user: AppUser = {
        firstName: authRes.firstName,
        lastName: authRes.lastName,
        email: authRes.email,
        accessToken: authRes.accessToken,
        expiryOfAccessToken: authRes.expiryOfAccessToken,
        refreshToken: authRes.refreshToken,
      };

      patchState(store, { user });
      localStorage.setItem(APP_USER_LOCAL_STORAGE_KEY, JSON.stringify(user));
    },

    loadUser() {
      const appUserValue = localStorage.getItem(APP_USER_LOCAL_STORAGE_KEY);
      if (!appUserValue) {
        return;
      }
      const user: AppUser = JSON.parse(appUserValue);
    
      const now = new Date().getUTCMilliseconds();
      const expirationDate = new Date(
        user.expiryOfAccessToken
      ).getUTCMilliseconds();

      const isTokenExpired = now > expirationDate;

      console.log("isTokenExpired", isTokenExpired);
      

      if (isTokenExpired) {
        this.logoutUser();
        return;
      }
      patchState(store, { user });
    },

    logoutUser() {
      accountService.logout();
      localStorage.removeItem(APP_USER_LOCAL_STORAGE_KEY);
      patchState(store, { user: null });
    },
  }))
);
