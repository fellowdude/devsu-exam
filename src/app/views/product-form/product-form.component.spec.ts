import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFormComponent } from './product-form.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IProducts } from 'src/app/shared/interfaces/products.interface';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        SharedModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      declarations: [ ProductFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear form', () => {
    let helper: IProducts = {
      id: 'aut-mov',
      name: 'Auto',
      logo: '',
      date_release: '09-26-2023',
      date_revision: '09-26-2024',
      description: 'Auto Movil'
    }
    component.productForm.patchValue({... helper });
    const button = fixture.nativeElement.querySelector('#reset');
    button.click();
    fixture.detectChanges();
    expect(component.productForm.pristine).toBeTrue();
  });

  it('should invalid form by id', () => {
    let helper: IProducts = {
      id: 'aut',
      name: 'Autoss',
      logo: '',
      date_release: '09-26-2023',
      date_revision: '09-26-2024',
      description: 'Auto Movil Es cool'
    }
    component.productForm.get('id')?.enable();
    component.productForm.get('date_revision')?.enable();
    component.productForm.patchValue({... helper });
    fixture.detectChanges();
    expect(component.productForm.invalid).toBeTrue();
  });

  it('should invalid form by date', () => {
    let helper: IProducts = {
      id: 'aut-mov',
      name: 'Autoss',
      logo: '',
      date_release: '09-26-2023',
      date_revision: '09-26-2023',
      description: 'Auto Movil Es cool'
    }
    component.productForm.get('id')?.enable();
    component.productForm.get('date_revision')?.enable();
    component.productForm.patchValue({... helper });
    fixture.detectChanges();
    expect(component.productForm.invalid).toBeTrue();
  });
});
