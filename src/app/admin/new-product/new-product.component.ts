import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NewProductService } from 'src/app/services/new-product.service';

@Component({
  selector: 'new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css'],
})
export class NewProductComponent implements OnInit, OnDestroy {
  pid: any;
  product: any = { name: '', price: '', category: '', imageURL: '' };
  subscription: Subscription | undefined;
  constructor(
    private route: ActivatedRoute,
    private newProductService: NewProductService
  ) {}

  ngOnInit(): void {
    this.pid = this.route.snapshot.paramMap.get('pid');
    console.log(this.pid);
    if (this.pid) {
      this.subscription = this.newProductService
        .getProductDetails(this.pid)
        .subscribe((snapshot) => {
          this.product = snapshot.payload.data();
          console.log(this.product);
        });
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  saveProduct(event: any) {
    event.preventDefault();
    this.newProductService.saveProduct(this.product, this.pid);
  }

  deleteProduct() {
    this.newProductService.deleteProduct(this.pid);
  }
}
