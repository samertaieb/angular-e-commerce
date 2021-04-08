import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/app.models';
import { AppService } from 'src/app/app.service';
import { AppSettings } from 'src/app/app.settings';
import { ProductService } from 'src/app/services/product.service';
import { ProductDialogComponent } from 'src/app/shared/products-carousel/product-dialog/product-dialog.component';
@Component({
  selector: 'app-list-of-product',
  templateUrl: './list-of-product.component.html',
  styleUrls: ['./list-of-product.component.scss']
})
export class ListOfProductComponent implements OnInit {
  public products: Array<any> = [];
  product: any;
  // public orders = [
  //   { number: '#3258', date: 'March 29, 2018', status: 'Completed', total: '$140.00 for 2 items', invoice: true },
  //   { number: '#3145', date: 'February 14, 2018', status: 'On hold', total: '$255.99 for 1 item', invoice: false },
  //   { number: '#2972', date: 'January 7, 2018', status: 'Processing', total: '$255.99 for 1 item', invoice: true },
  //   { number: '#2971', date: 'January 5, 2018', status: 'Completed', total: '$73.00 for 1 item', invoice: true },
  //   { number: '#1981', date: 'December 24, 2017', status: 'Pending Payment', total: '$285.00 for 2 items', invoice: false },
  //   { number: '#1781', date: 'September 3, 2017', status: 'Refunded', total: '$49.00 for 2 items', invoice: false }
  // ]
  constructor(public appSettings:AppSettings, 
    private activatedRoute: ActivatedRoute, 
    public appService:AppService, 
    public dialog: MatDialog, 
    private router: Router,
    private productService:ProductService) { }

  ngOnInit() {
    this.getAllProducts()
  }
  public getAllProducts(){
    this.productService.getAllProducts().subscribe((data: any) => {
      console.log(data);
      
      this.products = data;
      console.log(this.products);
      // for (var index = 0; index < 3; index++) {
      //   this.products = this.products.concat(this.products);        
      // }
    })
  }
  public deleteProduct(id){
    
    this.productService.deleteProduct(id).subscribe(()=>{this.ngOnInit()
     
    })
    
  }
  public openProductDialog(product){   
    let dialogRef = this.dialog.open(ProductDialogComponent, {
        data: product,
        panelClass: 'product-dialog',
      //  direction: (this.settings.rtl) ? 'rtl' : 'ltr'
    });
    dialogRef.afterClosed().subscribe(product => {
      if(product){
        this.router.navigate(['/products/listOfProducts', product.id, product.name]); 
      }
    });
}}
