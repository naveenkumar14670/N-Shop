import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  userData: any = {};
  subscription: Subscription | undefined;
  constructor(private db: AngularFirestore) {}

  ngOnInit(): void {
    const uid: any = localStorage.getItem('uid');
    this.subscription = this.db
      .collection('users')
      .doc(uid)
      .snapshotChanges()
      .subscribe((snapshot) => {
        this.userData = snapshot.payload.data();
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  handleImageInput(event: any) {
    const uid: any = localStorage.getItem('uid');
    const n = event.target.files.length;
    if (n !== 0) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        var fileContent = reader.result;
        this.db.collection('users').doc(uid).update({
          imageURL: fileContent,
        });
      };
    }
  }
}
