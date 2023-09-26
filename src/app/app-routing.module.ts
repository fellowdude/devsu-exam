import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: 'products',
    loadChildren: () => import('./views/product-list/product-list.module').then((m) => m.ProductListModule),
  },
  {
    path: 'product-form',
    loadChildren: () => import('./views/product-form/product-form.module').then((m) => m.ProductFormModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
