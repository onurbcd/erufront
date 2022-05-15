import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared';
import { BillTypeListComponent } from './containers';

export const BillTypeRoutes: Routes = [
  {
    path: '',
    component: BillTypeListComponent,
  },
  {
    path: 'new',
    // component: SecretCreationComponent,
  },
  {
    path: ':id/edit',
    // component: SecretCreationComponent,
  },
];

@NgModule({
  declarations: [BillTypeListComponent],
  imports: [SharedModule, RouterModule.forChild(BillTypeRoutes)],
})
export class BillTypeModule {}