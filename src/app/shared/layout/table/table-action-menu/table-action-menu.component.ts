import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/shared/services/http/products.service';

@Component({
  selector: 'app-table-action-menu',
  templateUrl: './table-action-menu.component.html',
  styleUrls: ['./table-action-menu.component.scss']
})
export class TableActionMenuComponent {
  toogleMenu: boolean = false;
  @ViewChild('buttonMenu') buttonMenu!: ElementRef;
  @ViewChild('menu') menu!: ElementRef;
  @Input() productId: string = '1';
  @Output() reload: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() edit: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private productService: ProductsService, private router: Router, private renderer: Renderer2){
    this.renderer.listen('window', 'click',(e:Event)=>{
      if(e.target!==this.menu?.nativeElement && e.target!==this.buttonMenu?.nativeElement){
        this.toogleMenu=false;
      }
    })
  }

  sendToEdit(): void {
    this.toogleMenu = false;
    this.edit.emit(true);
    this.router.navigate(['product-form/'+this.productId]);
  }

  deleteItem(): void {
    this.toogleMenu = false;
    this.productService.deleteProduct(this.productId).subscribe({
      next: (response) => {
        console.log(response);
        this.reload.emit(true);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
