import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  // Set an item in sessionStorage
  setItem(key: string, value: any): void {
    sessionStorage.setItem(key, value);
  }

  // Get an item from sessionStorage
  getItem(key: string): any {
    const item = sessionStorage.getItem(key);
    return item;
  }

  // Remove an item from sessionStorage
  removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }
}
