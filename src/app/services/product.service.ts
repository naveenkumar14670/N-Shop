import { Subscription } from 'rxjs';
import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService implements OnInit, OnDestroy {
  subscription: Subscription | undefined;

  constructor(private db: AngularFirestore, private authService: AuthService) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  getProducts() {
    return this.db
      .collection('products', (ref) => ref.orderBy('name'))
      .snapshotChanges();
  }

  addProductToCart(product: any) {
    const userID: any = localStorage.getItem('uid');
    this.db
      .collection('users')
      .doc(userID)
      .collection('userCart')
      .doc(product.id)
      .set({
        itemCount: 1,
        ...product,
      });
    localStorage.setItem(product.id, JSON.stringify(1));
  }

  updateProductInCart(product: any, count: number) {
    const userID: any = localStorage.getItem('uid');
    this.db
      .collection('users')
      .doc(userID)
      .collection('userCart')
      .doc(product.id)
      .update({
        itemCount: count,
      });
    localStorage.setItem(product.id, JSON.stringify(count));
  }

  deleteProductFromCart(productID: string) {
    const userID: any = localStorage.getItem('uid');
    this.db
      .collection('users')
      .doc(userID)
      .collection('userCart')
      .doc(productID)
      .delete();
    localStorage.removeItem(productID);
  }
}
