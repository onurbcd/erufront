import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared';
import { CategoryFilterComponent, CategoryGridComponent } from './components';
import { CategoryListComponent } from './containers';

export const CategoryRoutes: Routes = [
  {
    path: '',
    component: CategoryListComponent,
  },
  /*{
    path: 'new',
    component: BillTypeCreationComponent,
  },
  {
    path: ':id/edit',
    component: BillTypeCreationComponent,
  },*/
];

@NgModule({
  declarations: [
    CategoryFilterComponent,
    CategoryListComponent,
    CategoryGridComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(CategoryRoutes)],
})
export class CategoryModule {}
