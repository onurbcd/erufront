import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Budget, BudgetFilter, BudgetSave } from '@model';
import { BudgetService, ToastService } from '@service';
import { BaseListDirective } from '@shared';

@Component({
  selector: 'app-budget-grid',
  templateUrl: './budget-grid.component.html',
  styleUrls: ['./budget-grid.component.css'],
})
export class BudgetGridComponent extends BaseListDirective<
  Budget,
  BudgetSave,
  BudgetFilter,
  string
> {
  displayedColumns: string[] = [
    'sequence',
    'name',
    'billType',
    'amount',
    'paid',
    'lastModifiedDate',
    'active',
    'config',
  ];

  max = -1;

  constructor(
    router: Router,
    matDialog: MatDialog,
    budgetService: BudgetService,
    toastService: ToastService
  ) {
    super('budget', router, matDialog, budgetService, toastService);

    this.defaultSort = {
      active: 'sequence',
      direction: 'asc',
    };
  }

  setMax(max: number): void {
    this.max = max;
  }
}
