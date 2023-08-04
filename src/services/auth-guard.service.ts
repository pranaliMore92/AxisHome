import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(public router: Router) { }
  canActivate(): boolean {
    if (!sessionStorage.getItem('basic')) {
    //if (!sessionStorage.getItem('basic')) {
      this.router.navigate(['requestforimobile']);
      return false;
    }
    return true;
  }
}
