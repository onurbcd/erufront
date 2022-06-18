import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared';
import { BudgetFilterComponent } from './components';
import { BudgetListComponent } from './containers';

export const BudgetRoutes: Routes = [
  {
    path: '',
    component: BudgetListComponent,
  },
  /*{
    path: 'new',
    component: BudgetCreationComponent,
  },
  {
    path: ':id/edit',
    component: BudgetCreationComponent,
  },*/
];

@NgModule({
  declarations: [BudgetListComponent, BudgetFilterComponent],
  imports: [SharedModule, RouterModule.forChild(BudgetRoutes)],
})
export class BudgetModule {}
