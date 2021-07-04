import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  categories: string[] = ['All', 'Food', 'Clothes', 'Accessories'];
  items: any[] = [];
  filteredItems: any[] = [];
  activeCategory: number = 0;
  subscription: Subscription | undefined;
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.subscription = this.productService
      .getProducts()
      .subscribe((snapshot) => {
        this.items = this.filteredItems = snapshot.map((data: any) => {
          let id = data.payload.doc.id;
          let content = data.payload.doc.data();
          return { id, ...content };
        });
      });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  changeActiveCategory(index: number) {
    this.activeCategory = index;
    this.filterItems();
  }

  filterItems() {
    const currentCategory = this.categories[this.activeCategory];
    if (currentCategory === 'All') this.filteredItems = this.items;
    else {
      this.filteredItems = this.items.filter(
        (item) => item.category.toLowerCase() === currentCategory.toLowerCase()
      );
    }
  }
}
