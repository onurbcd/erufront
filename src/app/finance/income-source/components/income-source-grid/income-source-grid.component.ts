import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IncomeSource, IncomeSourceFilter, IncomeSourceSave } from '@model';
import { IncomeSourceService, ToastService } from '@service';
import { BaseListDirective } from '@shared';

@Component({
  selector: 'app-income-source-grid',
  templateUrl: './income-source-grid.component.html',
  styleUrls: ['./income-source-grid.component.css'],
})
export class IncomeSourceGridComponent extends BaseListDirective<
  IncomeSource,
  IncomeSourceSave,
  IncomeSourceFilter,
  string
> {
  displayedColumns: string[] = ['name', 'lastModifiedDate', 'active', 'config'];

  constructor(
    router: Router,
    matDialog: MatDialog,
    incomeSourceService: IncomeSourceService,
    toastService: ToastService
  ) {
    super(
      'income-source',
      router,
      matDialog,
      incomeSourceService,
      toastService
    );
  }
}
