import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared';
import { BillTypeFilterComponent, BillTypeGridComponent } from './components';
import { BillTypeCreationComponent, BillTypeListComponent } from './containers';

export const BillTypeRoutes: Routes = [
  {
    path: '',
    component: BillTypeListComponent,
  },
  {
    path: 'new',
    component: BillTypeCreationComponent,
  },
  {
    path: ':id/edit',
    component: BillTypeCreationComponent,
  },
];

@NgModule({
  declarations: [
    BillTypeListComponent,
    BillTypeFilterComponent,
    BillTypeGridComponent,
    BillTypeCreationComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(BillTypeRoutes)],
})
export class BillTypeModule {}
