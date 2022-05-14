import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared';

export const BillTypeRoutes: Routes = [
  {
    path: '',
    // component: SecretListComponent,
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
  declarations: [],
  imports: [SharedModule, RouterModule.forChild(BillTypeRoutes)],
})
export class BillTypeModule {}
