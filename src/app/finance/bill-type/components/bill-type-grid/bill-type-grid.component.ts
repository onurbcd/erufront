import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BillType, BillTypeFilter, BillTypeSave } from '@model';
import { BillTypeService, ToastService } from '@service';
import { BaseListDirective } from '@shared';

@Component({
  selector: 'app-bill-type-grid',
  templateUrl: './bill-type-grid.component.html',
  styleUrls: ['./bill-type-grid.component.css'],
})
export class BillTypeGridComponent extends BaseListDirective<
  BillType,
  BillTypeSave,
  BillTypeFilter,
  string
> {
  displayedColumns: string[] = [
    'name',
    'path',
    'category',
    'lastModifiedDate',
    'active',
    'config',
  ];

  constructor(
    router: Router,
    matDialog: MatDialog,
    billTypeService: BillTypeService,
    toastService: ToastService
  ) {
    super('bill-type', router, matDialog, billTypeService, toastService);
  }
}
