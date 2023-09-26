import { Injectable } from '@angular/core';
import { IProducts } from '../../interfaces/products.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductInformationService {
  private productInformation: BehaviorSubject<IProducts | null> = new BehaviorSubject<IProducts | null>(null);
  productInformationCheck = this.productInformation.asObservable();

  constructor() { }

  setProductInformation(productBody: IProducts): void {
    this.productInformation.next(productBody);
  }
}
