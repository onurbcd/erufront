import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared';
import { SourceFilterComponent, SourceGridComponent } from './components';
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
  declarations: [
    SourceFilterComponent,
    SourceListComponent,
    SourceGridComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(SourceRoutes)],
})
export class SourceModule {}
