import { AuthService } from './auth.service';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    const uid: any = localStorage.getItem('uid');
    return this.authService.getUserDetails(uid).pipe(
      map((user) => {
        const data: any = user.payload.data();
        if (data.isAdmin) return true;
        this.router.navigate(['/']);
        return false;
      })
    );
  }
}
