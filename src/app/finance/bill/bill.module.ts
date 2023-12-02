import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared';
import { BillListComponent } from './containers';

export const BillRoutes: Routes = [
  {
    path: '',
    component: BillListComponent,
  },
];

@NgModule({
  declarations: [BillListComponent],
  imports: [SharedModule, RouterModule.forChild(BillRoutes)],
})
export class BillModule {}
