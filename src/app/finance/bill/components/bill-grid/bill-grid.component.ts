import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Bill, BillFilter, BillSave } from '@model';
import { BillService, ToastService } from '@service';
import { BaseListDirective } from '@shared';

@Component({
  selector: 'app-bill-grid',
  templateUrl: './bill-grid.component.html',
  styleUrl: './bill-grid.component.css',
})
export class BillGridComponent extends BaseListDirective<
  Bill,
  BillSave,
  BillFilter,
  string
> {
  displayedColumns: string[] = [
    'dates',
    'value',
    'dependencies',
    'status',
    'others',
    'observation',
    'config',
  ];

  constructor(
    router: Router,
    matDialog: MatDialog,
    billService: BillService,
    toastService: ToastService
  ) {
    super('bill', router, matDialog, billService, toastService);
  }
}
