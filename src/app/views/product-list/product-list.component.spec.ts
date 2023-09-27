import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        SharedModule,
        FormsModule
      ],
      declarations: [ ProductListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search', () => {
    component.searchString = 'Tar';
    component.productList = [
      {
        id: 'tarj-cred',
        name: 'Tarjetas de Credito',
        logo: '',
        date_release: '09-26-2023',
        date_revision: '09-26-2024',
        description: 'Tarjetas de credito'
      },
      {
        id: 'aut-mov',
        name: 'Auto',
        logo: '',
        date_release: '09-26-2023',
        date_revision: '09-26-2024',
        description: 'Auto Movil'
      }
    ]
    component.productListReserve = [
      {
        id: 'tarj-cred',
        name: 'Tarjetas de Credito',
        logo: '',
        date_release: '09-26-2023',
        date_revision: '09-26-2024',
        description: 'Tarjetas de credito'
      },
      {
        id: 'aut-mov',
        name: 'Auto',
        logo: '',
        date_release: '09-26-2023',
        date_revision: '09-26-2024',
        description: 'Auto Movil'
      }
    ]
    component.onChange();
    fixture.detectChanges();
    expect(component.productList.length).toBe(1);
  });

  it('should redirect', () => {
    const spy = spyOn(component, 'addNewProduct' as never)
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });
});
