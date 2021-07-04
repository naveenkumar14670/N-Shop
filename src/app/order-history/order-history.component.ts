import { Subscription } from 'rxjs';
import { OrderHistoryService } from './../services/order-history.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
})
export class OrderHistoryComponent implements OnInit, OnDestroy {
  currentTime = new Date().getTime();
  orders: any[] = [];
  subscription: Subscription | undefined;

  constructor(private orderHistoryService: OrderHistoryService) {}

  ngOnInit(): void {
    this.subscription = this.orderHistoryService
      .getOrderHistory()
      .subscribe((snapshot) => {
        this.orders = snapshot.map((doc) => doc.payload.doc.data());
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
