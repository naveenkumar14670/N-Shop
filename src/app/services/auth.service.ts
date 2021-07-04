import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private fAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) {}

  getUserDetails(userId: string) {
    return this.db.collection('users').doc(userId).snapshotChanges();
  }

  signup(email: string, password: string, displayName: string) {
    this.fAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        const uid: string = res.user?.uid ? res.user.uid : '';
        localStorage.setItem('uid', uid);
        this.db.collection('users').doc(res.user?.uid).set({
          displayName: displayName,
          email: email,
          isAdmin: false,
          imageURL:
            'https://cdn3.iconfinder.com/data/icons/galaxy-open-line-gradient-i/200/contacts-512.png',
        });
        this.router.navigate(['/']);
      })
      .catch((err: Error) => alert(err.message));
  }

  login(email: string, password: string) {
    this.fAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        const uid: string = res.user?.uid ? res.user.uid : '';
        localStorage.setItem('uid', uid);
        this.router.navigate(['/']);
      })
      .catch((err: Error) => alert(err.message));
  }

  logout() {
    localStorage.removeItem('uid');
    this.fAuth.auth.signOut();
    this.router.navigate(['/login']);
  }

  resetPassword(email: string) {
    this.fAuth.auth
      .sendPasswordResetEmail(email)
      .then((res) => alert('Email Sent Successfully!'))
      .catch((err) => alert(err.message));
  }
}
