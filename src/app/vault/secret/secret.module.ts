import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared';
import { SecretFilterComponent } from './components';

export const SecretRoutes: Routes = [
  {
    path: '',
    // component: SourceListComponent,
  },
  {
    path: 'new',
    // component: SourceCreationComponent,
  },
  {
    path: ':id/edit',
    // component: SourceCreationComponent,
  },
];

@NgModule({
  declarations: [SecretFilterComponent],
  imports: [SharedModule, RouterModule.forChild(SecretRoutes)],
})
export class SecretModule {}
