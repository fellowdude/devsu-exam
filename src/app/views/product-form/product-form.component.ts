import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { dateLessThan, fromNowDate, formatToday } from './validators/date.validator';
import { ProductsService } from 'src/app/shared/services/http/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductInformationService } from 'src/app/shared/services/internal/product-information.service';
import { IProducts } from 'src/app/shared/interfaces/products.interface';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit{
  productForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.minLength(3), Validators.maxLength(10), Validators.required]),
    name: new FormControl(null, [Validators.minLength(5), Validators.maxLength(100), Validators.required]),
    description: new FormControl(null, [Validators.minLength(10), Validators.maxLength(200), Validators.required]),
    logo: new FormControl(null, [Validators.required]),
    date_release: new FormControl(null, [Validators.required, fromNowDate]),
    date_revision: new FormControl(null, [Validators.required]),
  }, {
    validators: [dateLessThan('date_release','date_revision')]
  });;
  today: Date = formatToday();
  productId: string | null = '';
  editing: boolean = false;
  showIdError: boolean = false;
  constructor(private productService: ProductsService, private route: ActivatedRoute, private productInformationService: ProductInformationService, private router: Router) {}

  ngOnInit() {
    this.productForm.get('date_revision')?.disable();
    this.productForm.get("date_release")?.valueChanges.subscribe(x => {
      const splitDate = x.split('-');
      const day = splitDate[2];
      const month = splitDate[1];
      const year = (Number(splitDate[0]) + 1).toString();
      const newDate = [year, month, day]
      this.productForm.get('date_revision')?.setValue(newDate.join('-'));
   })

    this.productId = this.route.snapshot.paramMap.get('id');

    this.productInformationService.productInformationCheck.subscribe({
      next: (response) => {
        if(response){
          let helper: IProducts = {
            id: response?.id || '',
            name: response?. name || '',
            description: response?.description || '',
            logo: response?. logo || '',
            date_release: response?.date_release.split('T')[0] || '',
            date_revision: response?.date_revision.split('T')[0] || '',
          }
          this.productForm.patchValue({... helper });
          sessionStorage.setItem('edit-product', JSON.stringify(helper));
        }
      }
    })

    if(sessionStorage.getItem('edit-product')){
      this.editing = true;
      let helper = JSON.parse(sessionStorage.getItem('edit-product') || '')
      this.productForm.patchValue({... helper });
      this.productId = this.productForm.get('id')?.value;
    }

    if(this.productId) this.productForm.get('id')?.disable();
    else sessionStorage.removeItem('edit-product');


  }

  onSubmit(): void {
    if(this.productForm.valid){
      this.productService.validateId(this.productForm.get('id')?.value).subscribe({
        next: (response) => {
          if(!this.productId){
            this.productForm.get('date_revision')?.enable();
            this.productService.addProduct(this.productForm.value).subscribe({
              next: (response) => {
                sessionStorage.removeItem('edit-product');
                this.router.navigate(['products']);
              },
              error: (error) => {
                console.log(error)
              },
              complete: () => {
                this.productForm.reset();
              }
            })
          }else{
            this.productForm.get('id')?.enable();
            this.productForm.get('date_revision')?.enable();
            this.productService.editProduct(this.productForm.value).subscribe({
              next: (response) => {
                sessionStorage.removeItem('edit-product');
                this.router.navigate(['products']);
              },
              error: (error) => {
                console.log(error)
              },
              complete: () => {
                this.productForm.reset();
              }
            })
          }
        },
        error: (error) => {
          this.showIdError = true;
          console.log(error);
        }
      })
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.productForm.controls;
  }
}
