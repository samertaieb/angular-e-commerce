import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../../../app/models/product';
import { ProductService } from 'src/app/services/product.service';

import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})

export class AddProductComponent implements OnInit {
  addProductForm: FormGroup;
  categories=[];
  product:Product;
  files: File[] = [];
  fileAttr = 'Choose File';
  fileInput: any;
  image;
  constructor(public formBuilder: FormBuilder ,private productService:ProductService,public router:Router, public snackBar: MatSnackBar,) { }

  ngOnInit() {// this.categories = this.productService.getcategories();
    this.addProductForm = this.formBuilder.group({
      'name': ['', Validators.required],
      'stock': ['', Validators.required],
      'price': ['', Validators.required],
      'category':['', Validators.required],
      'description': ['', Validators.required],
      
  })
  console.log(this.addProductForm);
  

}
public addProduct(values:Object):void{
 
  this.product=this.addProductForm.value;
  console.log(this.product);
  const formData =new FormData();
  formData.set('name', this.product.name);
  formData.set('stock', this.product.stock);
  formData.set('price', this.product.price);
  formData.set('category', this.product.category);
  formData.set('description', this.product.description);
  formData.set('image', this.files[0]);
  this.productService.addProduct(formData).subscribe(result=>{
    console.log(JSON.stringify(result))},
    err=>{console.log(err);},()=>{this.router.navigateByUrl('account/listOfProducts')}
    );
  
    

}
// uploadFileEvt(imgFile: any) {
//   if (imgFile.target.files && imgFile.target.files[0]) {
//     this.fileAttr = '';
//     Array.from(imgFile.target.files).forEach((file: File) => {
//       this.fileAttr += file.name + ' - ';
//     });

//     // HTML5 FileReader API
//     let reader = new FileReader();
//     reader.onload = (e: any) => {
//       let image = new Image();
//       image.src = e.target.result;
//       image.onload = rs => {
//         let imgBase64Path = e.target.result;
//       };
//     };
//     reader.readAsDataURL(imgFile.target.files[0]);
    
//     // Reset if duplicate image uploaded again
//     this.fileInput.nativeElement.value = "";
//   } else {
//     this.fileAttr = 'Choose File';
//   }
// }
onSelect(event) {
  console.log(event);
  this.image=event.addedFiles
  this.files.push(...event.addedFiles);
}

onRemove(event) {
  console.log(event);
  this.image=null
 // this.files.splice(this.files.indexOf(event), 1);
}
}