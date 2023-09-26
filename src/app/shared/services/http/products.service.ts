import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { IProducts } from '../../interfaces/products.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private baseService: BaseService) { }

  validateId(id: string): Observable<any> {
    return this.baseService.getParam('products/verification', id);
  }

  getList(): Observable<any> {
    return this.baseService.get('products');
  }

  getProductById(productId: string): Observable<any> {
    return this.baseService.get('products/'+productId);
  }

  addProduct(productBody: IProducts): Observable<any> {
    return this.baseService.post('products', productBody);
  }

  editProduct(productBody: IProducts): Observable<any> {
    return this.baseService.put('products', productBody);
  }

  deleteProduct(productId: string): Observable<any> {
    return this.baseService.delete('products', productId);
  }
}
