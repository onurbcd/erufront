import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared';
import {
  CategoryFilterComponent,
  CategoryFormComponent,
  CategoryGridComponent,
} from './components';
import { CategoryCreationComponent, CategoryListComponent } from './containers';

export const CategoryRoutes: Routes = [
  {
    path: '',
    component: CategoryListComponent,
  },
  {
    path: 'new',
    component: CategoryCreationComponent,
  },
  {
    path: ':id/edit',
    component: CategoryCreationComponent,
  },
];

@NgModule({
  declarations: [
    CategoryFilterComponent,
    CategoryListComponent,
    CategoryGridComponent,
    CategoryFormComponent,
    CategoryCreationComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(CategoryRoutes)],
})
export class CategoryModule {}
