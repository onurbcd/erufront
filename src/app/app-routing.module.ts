import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'secret',
    loadChildren: () =>
      import('./vault/secret/secret.module').then((m) => m.SecretModule),
  },
  {
    path: 'bill-type',
    loadChildren: () =>
      import('./finance/bill-type/bill-type.module').then(
        (m) => m.BillTypeModule
      ),
  },
  {
    path: 'budget',
    loadChildren: () =>
      import('./finance/budget/budget.module').then((m) => m.BudgetModule),
  },
  {
    path: 'category',
    loadChildren: () =>
      import('./finance/category/category.module').then(
        (m) => m.CategoryModule
      ),
  },
  {
    path: 'day',
    loadChildren: () =>
      import('./finance/day/day.module').then((m) => m.DayModule),
  },
  {
    path: 'income-source',
    loadChildren: () =>
      import('./finance/income-source/income-source.module').then(
        (m) => m.IncomeSourceModule
      ),
  },
  {
    path: 'source',
    loadChildren: () =>
      import('./finance/source/source.module').then((m) => m.SourceModule),
  },
  {
    path: 'balance',
    loadChildren: () =>
      import('./finance/balance/balance.module').then((m) => m.BalanceModule),
  },
  {
    path: 'bill',
    loadChildren: () =>
      import('./finance/bill/bill.module').then((m) => m.BillModule),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
