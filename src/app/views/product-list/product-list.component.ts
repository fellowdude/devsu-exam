import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IProducts } from 'src/app/shared/interfaces/products.interface';
import { ITableHeader } from 'src/app/shared/interfaces/table-header.interface';
import { ProductsService } from 'src/app/shared/services/http/products.service';
import { ProductInformationService } from 'src/app/shared/services/internal/product-information.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {

  tableHeader: Array<ITableHeader> = [
    {
      title: 'Logo',
      cellTag: 'logo',
      type: 'image',
    },
    {
      title: 'Nombre del producto',
      cellTag: 'name',
      type: 'text',
    },
    {
      title: 'Descripción',
      cellTag: 'description',
      type: 'text',
    },
    {
      title: 'Fecha de liberación',
      cellTag: 'date_release',
      type: 'date',
    },
    {
      title: 'Fecha de reestauración',
      cellTag: 'date_revision',
      type: 'date',
    },
  ]

  productList: Array<IProducts> = [];
  productListReserve: Array<IProducts> = [];

  searchString: string = '';

  constructor(private productService: ProductsService, private productInformationService: ProductInformationService, private router: Router) {
    this.listProducts();
  }

  listProducts(): void {
    sessionStorage.removeItem('edit-product');
    this.productService.getList().subscribe({
      next: (response) => {
        this.productList = response;
        this.productListReserve = response;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  editSelect(event: IProducts): void {
    this.productInformationService.setProductInformation(event);
  }

  addNewProduct(): void {
    this.router.navigate(['product-form']);
  }

  onChange(): void {
    if(this.searchString.length >= 2){
      this.productList = this.productListReserve.filter( (e)=>{
        return e.name.includes(this.searchString);
      })
    }
    if(this.searchString === '') {
      this.productList = [... this.productListReserve];
    }
  }
}
