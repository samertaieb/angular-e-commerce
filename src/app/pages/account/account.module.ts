import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AccountComponent } from './account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InformationComponent } from './information/information.component';
import { AddressesComponent } from './addresses/addresses.component';
import { OrdersComponent } from './orders/orders.component';
import{ListOfProductComponent} from './list-of-product/list-of-product.component';
import {MatSelectModule} from '@angular/material/select';
import { AddProductComponent } from './add-product/add-product.component';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatProgressBarModule } from '@angular/material';
import { NgxDropzoneModule } from 'ngx-dropzone';
export const routes = [
  { 
      path: '', 
      component: AccountComponent, children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: 'dashboard', component: DashboardComponent, data: {  breadcrumb: 'Dashboard' } },
          { path: 'addProduct', component: AddProductComponent, data: {  breadcrumb: 'addProduct' } },
          { path: 'information', component: InformationComponent, data: {  breadcrumb: 'Information' } },
          { path: 'addresses', component: AddressesComponent, data: {  breadcrumb: 'Addresses' } },
          { path: 'orders', component: OrdersComponent, data: {  breadcrumb: 'Orders' } },
          { path: 'listOfProducts', component: ListOfProductComponent, data: {  breadcrumb: 'listOfProducts' } }
      ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule,
    MatSelectModule,
    MatInputModule, MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule,
    FormsModule,
    NgxDropzoneModule
    
  ],
  declarations: [
    AccountComponent,
    DashboardComponent,
    InformationComponent,
    AddressesComponent,
    OrdersComponent,
    ListOfProductComponent,
    AddProductComponent
  ],
  bootstrap:[AccountComponent]
})
export class AccountModule { }
