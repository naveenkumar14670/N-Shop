import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderHistoryService } from '../services/order-history.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  total: any;
  cost: any;
  products: any;

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    addressLine1: new FormControl('', Validators.required),
    addressLine2: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
  });

  constructor(
    private route: ActivatedRoute,
    private orderHistoryService: OrderHistoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.total = this.route.snapshot.paramMap.get('total');
    this.cost = this.route.snapshot.paramMap.get('cost');
    this.products = this.route.snapshot.paramMap.get('products');
    this.products = JSON.parse(this.products !== null ? this.products : '');
  }

  get name() {
    return this.form.get('name');
  }

  get addressLine1() {
    return this.form.get('addressLine1');
  }

  get addressLine2() {
    return this.form.get('addressLine2');
  }

  get city() {
    return this.form.get('city');
  }

  handleSubmit(event: any) {
    event.preventDefault();
    const deliveryTo = event.target.name.value;
    const addressLine1 = event.target.addressLine1.value;
    const addressLine2 = event.target.addressLine2.value;
    const city = event.target.city.value;
    this.orderHistoryService.placeOrder({
      deliveryTo: deliveryTo,
      addressLine1: addressLine1,
      addressLine2: addressLine2,
      city: city,
      total: this.total,
      cost: this.cost,
      products: this.products,
    });
    this.router.navigate(['/orderHistory']);
  }
}
