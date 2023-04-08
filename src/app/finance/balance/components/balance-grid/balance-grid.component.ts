import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Balance, BalanceFilter, BalanceSave } from '@model';
import { ToastService } from '@service';
import { BalanceService } from '@service/finance/balance.service';
import { BaseListDirective } from '@shared';

@Component({
  selector: 'app-balance-grid',
  templateUrl: './balance-grid.component.html',
  styleUrls: ['./balance-grid.component.css'],
})
export class BalanceGridComponent extends BaseListDirective<
  Balance,
  BalanceSave,
  BalanceFilter,
  string
> {
  displayedColumns: string[] = [
    'sequence',
    'day',
    'source',
    'category',
    'amount',
    'code',
    'description',
    'balanceType',
    'lastModifiedDate',
    'active',
    'config',
  ];

  max = -1;

  constructor(
    router: Router,
    matDialog: MatDialog,
    balanceService: BalanceService,
    toastService: ToastService
  ) {
    super('balance', router, matDialog, balanceService, toastService);

    this.defaultSort = {
      active: 'sequence',
      direction: 'asc',
    };
  }
}
