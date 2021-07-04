import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class NewProductService {
  constructor(private db: AngularFirestore, private route: Router) {}

  getProductDetails(pid: string) {
    return this.db.collection('products').doc(pid.trim()).snapshotChanges();
  }

  saveProduct(product: any, pid: string) {
    if (pid) this.db.collection('products').doc(pid.trim()).update(product);
    else this.db.collection('products').add(product);
    this.route.navigate(['/manageProducts']);
  }

  deleteProduct(pid: string) {
    this.db.collection('products').doc(pid.trim()).delete();
    this.route.navigate(['/manageProducts']);
  }
}
