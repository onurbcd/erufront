import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Source, SourceFilter, SourceSave } from '@model';
import { SourceService, ToastService } from '@service';
import { BaseListDirective } from '@shared';

@Component({
  selector: 'app-source-grid',
  templateUrl: './source-grid.component.html',
  styleUrls: ['./source-grid.component.css'],
})
export class SourceGridComponent extends BaseListDirective<
  Source,
  SourceSave,
  SourceFilter,
  string
> {
  displayedColumns: string[] = [
    'name',
    'incomeSourceName',
    'sourceType',
    'currencyType',
    'balance',
    'lastModifiedDate',
    'active',
    'config',
  ];

  constructor(
    router: Router,
    matDialog: MatDialog,
    sourceService: SourceService,
    toastService: ToastService
  ) {
    super('source', router, matDialog, sourceService, toastService);
  }
}
