import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './layout/header/header.component';
import { TableComponent } from './layout/table/table.component';
import { TableFooterComponent } from './layout/table/table-footer/table-footer.component';
import { TableActionMenuComponent } from './layout/table/table-action-menu/table-action-menu.component';


@NgModule({
  declarations: [
    HeaderComponent,
    TableComponent,
    TableFooterComponent,
    TableActionMenuComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    HeaderComponent,
    TableComponent
  ]
})
export class SharedModule { }
