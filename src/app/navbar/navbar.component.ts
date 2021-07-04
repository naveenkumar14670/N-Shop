import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  title: string = 'N-Shop';
  userData: any = {};
  subscription: Subscription | undefined;

  constructor(private authService: AuthService, private db: AngularFirestore) {}

  ngOnInit(): void {
    const uid: any = localStorage.getItem('uid');
    this.subscription = this.authService
      .getUserDetails(uid)
      .subscribe((snapshot) => {
        this.userData = snapshot.payload.data();
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }
}
