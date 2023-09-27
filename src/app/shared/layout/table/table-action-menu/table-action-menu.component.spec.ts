import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableActionMenuComponent } from './table-action-menu.component';
import { HttpClientModule } from '@angular/common/http';

describe('TableActionMenuComponent', () => {
  let component: TableActionMenuComponent;
  let fixture: ComponentFixture<TableActionMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      declarations: [ TableActionMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableActionMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle menu', () => {
    const img = fixture.nativeElement.querySelector('img');
    img.click();
    fixture.detectChanges();
    expect(component.toogleMenu).toBeTrue();
  });

  it('should send to edit', () => {
    component.toogleMenu = true;
    fixture.detectChanges();
    const spy = spyOn(component, 'sendToEdit' as never);
    const button = fixture.nativeElement.querySelector('#edit');
    button.click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should send to delete', () => {
    component.toogleMenu = true;
    fixture.detectChanges();
    const spy = spyOn(component, 'deleteItem' as never);
    const button = fixture.nativeElement.querySelector('#delete');
    button.click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });
});
