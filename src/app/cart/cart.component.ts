import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  total: number = 0;
  totalCost: number = 0;
  items: any[] = [];
  subscription: Subscription | undefined;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    const uid: any = localStorage.getItem('uid');
    this.subscription = this.cartService
      .getCartItems(uid)
      .subscribe((snapshot) => {
        this.totalCost = 0;
        this.total = 0;
        this.items = snapshot.map((doc) => {
          let data = doc.payload.doc.data();
          this.total += data.itemCount;
          this.totalCost += data.price * data.itemCount;
          return data;
        });
      });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  incrementInCart(item: any) {
    const uid: any = localStorage.getItem('uid');
    const newCount = item.itemCount + 1;
    this.cartService.updateItemInCart(uid, item.id, newCount);
  }

  decrementInCart(item: any) {
    const uid: any = localStorage.getItem('uid');
    const newCount = item.itemCount - 1;
    if (newCount === 0) this.cartService.removeItemFromCart(uid, item.id);
    else this.cartService.updateItemInCart(uid, item.id, newCount);
  }

  removeAllItemsFromCart() {
    const uid: any = localStorage.getItem('uid');
    this.cartService.removeAllItemsFromCart(uid);
  }

  checkOut() {
    this.router.navigate([
      '/orders',
      this.total,
      this.totalCost,
      JSON.stringify(this.items),
    ]);
  }
}
