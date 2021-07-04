import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from 'src/environments/environment';

import { AuthService } from './services/auth.service';
import { ProductService } from './services/product.service';
import { CartService } from './services/cart.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AdminGuardService } from './services/admin-guard.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { ProductComponent } from './product/product.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { NoDataComponent } from './no-data/no-data.component';
import { ManageProductsComponent } from './admin/manage-products/manage-products.component';
import { NewProductComponent } from './admin/new-product/new-product.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CartComponent,
    OrdersComponent,
    OrderHistoryComponent,
    ProductComponent,
    ManageProductsComponent,
    NewProductComponent,
    NoDataComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, canActivate: [AuthGuardService] },
      {
        path: 'cart',
        component: CartComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'orderHistory',
        component: OrderHistoryComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'orders/:total/:cost/:products',
        component: OrdersComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'manageProducts',
        component: ManageProductsComponent,
        canActivate: [AuthGuardService, AdminGuardService],
      },
      {
        path: 'editProduct/:pid',
        component: NewProductComponent,
        canActivate: [AuthGuardService, AdminGuardService],
      },
      {
        path: 'newProduct',
        component: NewProductComponent,
        canActivate: [AuthGuardService, AdminGuardService],
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'signup',
        component: SignupComponent,
      },
      {
        path: 'forgotPassword',
        component: ForgotPasswordComponent,
      },
      { path: '**', redirectTo: '/' },
    ]),
  ],
  providers: [
    ProductService,
    CartService,
    AuthService,
    AuthGuardService,
    AdminGuardService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
