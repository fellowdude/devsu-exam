import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared.module';
import { IProducts } from '../../interfaces/products.interface';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        SharedModule
      ],
      declarations: [ TableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list', () => {
    component.tableContent = [
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
    ];
    component.tableHeader = [
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
    ];

    fixture.detectChanges();
    const lines = fixture.nativeElement.querySelectorAll('tr');
    console.log(lines);
    expect(lines.length).toBe(3);
  });

  it('should emit', () => {
    let helper: IProducts = {
      id: 'aut-mov',
      name: 'Autoss',
      logo: '',
      date_release: '09-26-2023',
      date_revision: '09-26-2023',
      description: 'Auto Movil Es cool'
    }
    const spy = spyOn(component.editSelect, 'emit' as never);
    component.editSelected(true, helper);
    expect(spy).toHaveBeenCalled();
  })
});
