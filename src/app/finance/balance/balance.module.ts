import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared';
import { BalanceListComponent } from './containers';

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
  declarations: [BalanceListComponent],
  imports: [SharedModule, RouterModule.forChild(BalanceRoutes)],
})
export class BalanceModule {}
