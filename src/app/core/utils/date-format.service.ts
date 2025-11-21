import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateFormat{
  public formatDate(): string {
    return new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }
}
