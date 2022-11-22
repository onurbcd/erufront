import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared';
import {
  SourceFilterComponent,
  SourceFormComponent,
  SourceGridComponent,
} from './components';
import { SourceCreationComponent, SourceListComponent } from './containers';

export const SourceRoutes: Routes = [
  {
    path: '',
    component: SourceListComponent,
  },
  {
    path: 'new',
    component: SourceCreationComponent,
  },
  {
    path: ':id/edit',
    component: SourceCreationComponent,
  },
];

@NgModule({
  declarations: [
    SourceFilterComponent,
    SourceListComponent,
    SourceGridComponent,
    SourceFormComponent,
    SourceCreationComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(SourceRoutes)],
})
export class SourceModule {}
