import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared';
import { BalanceCreationComponent, BalanceListComponent } from './containers';
import {
  BalanceFilterComponent,
  BalanceFormComponent,
  BalanceGridComponent,
  BalanceValuesComponent,
} from './components';

export const BalanceRoutes: Routes = [
  {
    path: '',
    component: BalanceListComponent,
  },
  {
    path: 'new',
    component: BalanceCreationComponent,
  },
  {
    path: ':id/edit',
    component: BalanceCreationComponent,
  },
];

@NgModule({
  declarations: [
    BalanceListComponent,
    BalanceFilterComponent,
    BalanceGridComponent,
    BalanceCreationComponent,
    BalanceFormComponent,
    BalanceValuesComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(BalanceRoutes)],
})
export class BalanceModule {}
