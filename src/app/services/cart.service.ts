import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private db: AngularFirestore, private authService: AuthService) {}

  getCartItems(userID: string) {
    return this.db
      .collection('users')
      .doc(userID)
      .collection('userCart')
      .snapshotChanges();
  }

  updateItemInCart(userID: string, productID: string, count: number) {
    this.db
      .collection('users')
      .doc(userID)
      .collection('userCart')
      .doc(productID)
      .update({
        itemCount: count,
      });
    localStorage.setItem(productID, JSON.stringify(count));
  }

  removeItemFromCart(userID: string, productID: string) {
    this.db
      .collection('users')
      .doc(userID)
      .collection('userCart')
      .doc(productID)
      .delete();
    localStorage.removeItem(productID);
  }

  removeAllItemsFromCart(userID: string) {
    this.db
      .collection('users')
      .doc(userID)
      .collection('userCart')
      .get()
      .subscribe((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          this.db
            .collection('users')
            .doc(userID)
            .collection('userCart')
            .doc(doc.id)
            .delete();
        });
      });
    localStorage.clear();
    localStorage.setItem('uid', userID);
  }
}
