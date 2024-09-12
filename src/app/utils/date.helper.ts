import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateHelper {
  getDateOnlyString(date: Date) {
    return `${date.getUTCFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate()}`;
  }
}
