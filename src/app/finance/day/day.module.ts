import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared';
import { DayFormComponent } from './components';
import { DayCreationComponent } from './containers';

export const DayRoutes: Routes = [
  {
    path: '',
    component: DayCreationComponent,
  },
];

@NgModule({
  declarations: [DayCreationComponent, DayFormComponent],
  imports: [SharedModule, RouterModule.forChild(DayRoutes)],
})
export class DayModule {}
