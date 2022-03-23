import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared';
import { SecretFilterComponent, SecretGridComponent } from './components';
import { SecretListComponent } from './containers';

export const SecretRoutes: Routes = [
  {
    path: '',
    component: SecretListComponent,
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
  declarations: [
    SecretFilterComponent,
    SecretGridComponent,
    SecretListComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(SecretRoutes)],
})
export class SecretModule {}
