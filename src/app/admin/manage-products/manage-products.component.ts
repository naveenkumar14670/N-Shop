import { Router } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css'],
})
export class ManageProductsComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  products: any[] = [];
  subscription: Subscription | undefined;
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private productservice: ProductService, private route: Router) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true,
      retrieve: true,
    };

    this.subscription = this.productservice
      .getProducts()
      .subscribe((snapshot) => {
        this.products = snapshot.map((data: any) => {
          let id = data.payload.doc.id;
          let content = data.payload.doc.data();
          return { id, ...content };
        });
        this.dtTrigger.next();
      });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.dtTrigger.unsubscribe();
  }

  editProduct(pid: string) {
    console.log(pid);
    this.route.navigate(['/editProduct', pid]);
  }
}
