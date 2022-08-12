import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared';
import {
  BudgetFilterComponent,
  BudgetFormComponent,
  BudgetGridComponent,
  BudgetValuesComponent,
} from './components';
import { BudgetCreationComponent, BudgetListComponent } from './containers';

export const BudgetRoutes: Routes = [
  {
    path: '',
    component: BudgetListComponent,
  },
  {
    path: 'new',
    component: BudgetCreationComponent,
  },
  {
    path: ':id/edit',
    component: BudgetCreationComponent,
  },
];

@NgModule({
  declarations: [
    BudgetListComponent,
    BudgetFilterComponent,
    BudgetGridComponent,
    BudgetCreationComponent,
    BudgetFormComponent,
    BudgetValuesComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(BudgetRoutes)],
})
export class BudgetModule {}
