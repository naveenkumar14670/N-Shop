import { CartService } from './cart.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class OrderHistoryService {
  constructor(private db: AngularFirestore, private cartService: CartService) {}

  getOrderHistory() {
    const uid: any = localStorage.getItem('uid');
    return this.db
      .collection('users')
      .doc(uid)
      .collection('orderHistory', (ref) => ref.orderBy('timestamp', 'desc'))
      .snapshotChanges();
  }

  placeOrder(order: any) {
    const uid: any = localStorage.getItem('uid');
    const orderDate = new Date();
    const deliveryTime = new Date();
    deliveryTime.setMinutes(orderDate.getMinutes() + 5);
    this.db
      .collection('users')
      .doc(uid)
      .collection('orderHistory')
      .add({
        orderDate: orderDate.toDateString(),
        deliveryTime: deliveryTime.getTime(),
        timestamp: new Date().toLocaleString(),
        ...order,
      });
    this.cartService.removeAllItemsFromCart(uid);
  }
}
