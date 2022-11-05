import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared';
import {
  IncomeSourceFilterComponent,
  IncomeSourceFormComponent,
  IncomeSourceGridComponent,
} from './components';
import {
  IncomeSourceCreationComponent,
  IncomeSourceListComponent,
} from './containers';

export const IncomeSourceRoutes: Routes = [
  {
    path: '',
    component: IncomeSourceListComponent,
  },
  {
    path: 'new',
    component: IncomeSourceCreationComponent,
  },
  {
    path: ':id/edit',
    component: IncomeSourceCreationComponent,
  },
];

@NgModule({
  declarations: [
    IncomeSourceFilterComponent,
    IncomeSourceFormComponent,
    IncomeSourceGridComponent,
    IncomeSourceCreationComponent,
    IncomeSourceListComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(IncomeSourceRoutes)],
})
export class IncomeSourceModule {}
