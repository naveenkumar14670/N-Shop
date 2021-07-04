import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const uid = localStorage.getItem('uid');
    if (uid !== null) this.router.navigate(['/']);
  }

  get username() {
    return this.form.get('username');
  }

  resetPassword(event: any) {
    const email: string = this.username?.value;
    this.authService.resetPassword(email);
  }
}
