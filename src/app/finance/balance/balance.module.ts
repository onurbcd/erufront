import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared';
import { BalanceListComponent } from './containers';
import { BalanceFilterComponent, BalanceGridComponent } from './components';

export const BalanceRoutes: Routes = [
  {
    path: '',
    component: BalanceListComponent,
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
  declarations: [
    BalanceListComponent,
    BalanceFilterComponent,
    BalanceGridComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(BalanceRoutes)],
})
export class BalanceModule {}
