import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'secret',
    loadChildren: () => import('./vault/secret/secret.module').then((m) => m.SecretModule),
  },
  {
    path: 'bill-type',
    loadChildren: () => import('./finance/bill-type/bill-type.module').then((m) => m.BillTypeModule),
  },
  {
    path: 'budget',
    loadChildren: () => import('./finance/budget/budget.module').then((m) => m.BudgetModule),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
