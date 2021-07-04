import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  @Input('item') item: any;
  addedToCart: boolean = false;
  itemCount: number = 0;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    let itemValue = localStorage.getItem(this.item.id);
    if (itemValue) {
      this.addedToCart = true;
      this.itemCount = parseInt(itemValue);
    }
  }

  addToCart() {
    this.addedToCart = true;
    this.itemCount = 1;
    this.productService.addProductToCart(this.item);
  }

  incrementInCart() {
    this.itemCount += 1;
    this.productService.updateProductInCart(this.item, this.itemCount);
  }

  decrementInCart() {
    this.itemCount -= 1;
    this.productService.updateProductInCart(this.item, this.itemCount);
    if (this.itemCount === 0) {
      this.addedToCart = false;
      this.productService.deleteProductFromCart(this.item.id);
    }
  }
}
