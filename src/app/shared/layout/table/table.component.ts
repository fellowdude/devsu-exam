import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITableHeader } from '../../interfaces/table-header.interface';
import { IProducts } from '../../interfaces/products.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() tableHeader: Array<ITableHeader> = [];
  @Input() tableContent: Array<any> = [];
  @Input() idCellName: string = '';
  @Output() listReload: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() editSelect: EventEmitter<IProducts> = new EventEmitter<IProducts>();

  editSelected(event: boolean, content: IProducts): void {
    this.editSelect.emit(content);
  }
}
