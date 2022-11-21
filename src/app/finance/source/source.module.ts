import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared';
import { SourceFilterComponent } from './components';
import { SourceListComponent } from './containers';

export const SourceRoutes: Routes = [
  {
    path: '',
    component: SourceListComponent,
  },
  /*{
    path: 'new',
    component: IncomeSourceCreationComponent,
  },
  {
    path: ':id/edit',
    component: IncomeSourceCreationComponent,
  },*/
];

@NgModule({
  declarations: [SourceFilterComponent, SourceListComponent],
  imports: [SharedModule, RouterModule.forChild(SourceRoutes)],
})
export class SourceModule {}
