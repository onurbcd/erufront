import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared';
import { BillListComponent, BillOpenComponent } from './containers';
import { BillFilterComponent } from './components';

export const BillRoutes: Routes = [
  {
    path: '',
    component: BillListComponent,
  },
  {
    path: 'open',
    component: BillOpenComponent,
  },
];

@NgModule({
  declarations: [BillListComponent, BillFilterComponent, BillOpenComponent],
  imports: [SharedModule, RouterModule.forChild(BillRoutes)],
})
export class BillModule {}
