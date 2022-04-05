import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared';
import {
  SecretFilterComponent,
  SecretFormComponent,
  SecretGridComponent,
} from './components';
import { SecretCreationComponent, SecretListComponent } from './containers';

export const SecretRoutes: Routes = [
  {
    path: '',
    component: SecretListComponent,
  },
  {
    path: 'new',
    component: SecretCreationComponent,
  },
  {
    path: ':id/edit',
    component: SecretCreationComponent,
  },
];

@NgModule({
  declarations: [
    SecretFilterComponent,
    SecretGridComponent,
    SecretListComponent,
    SecretFormComponent,
    SecretCreationComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(SecretRoutes)],
})
export class SecretModule {}
