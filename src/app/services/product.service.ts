import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import{Product} from '../models/product'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl="http://localhost:3000/"

  constructor(private http:HttpClient) { }
  getAllProducts():Observable<Product>{
    return this.http.get< Product>(this.baseUrl+"product/products")
  }
  // getcategories(){
  //  return [nameCategory="informatique",
  //         name:"mobile",
  //         name:"informatique",
  //         name:"informatique",
  //         name:"informatique",
  
  //             ]
  // }
  addProduct(produit):Observable<Product>{
    return this.http.post <Product>(this.baseUrl+"product/addProduct",produit)
  }
  deleteProduct(id):Observable<any>{
    return this.http.delete<any>(this.baseUrl+"product/deleteProduct/"+id)
  }
  updateProduct():Observable<Product>{
    return this.http.put<Product>(this.baseUrl+"updateProduct",Product)
  }
  getProductById():Observable<Product>{
    return this.http.get<Product>(this.baseUrl+"Product/:id")
  }
}
