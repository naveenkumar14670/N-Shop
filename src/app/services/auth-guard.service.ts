import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    const uid: any = localStorage.getItem('uid');
    if (uid !== null) return true;
    this.router.navigate(['/login']);
    return false;
  }
}
