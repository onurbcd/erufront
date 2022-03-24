import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Secret, SecretFilter } from '@model';
import { SecretService, ToastService } from '@service';
import { BaseListDirective } from '@shared';

@Component({
  selector: 'app-secret-grid',
  templateUrl: './secret-grid.component.html',
  styleUrls: ['./secret-grid.component.css'],
})
export class SecretGridComponent extends BaseListDirective<
  Secret,
  SecretFilter,
  string
> {
  displayedColumns: string[] = [
    'name',
    'description',
    'link',
    'username',
    'lastModifiedDate',
    'config',
  ];

  constructor(
    router: Router,
    matDialog: MatDialog,
    secretService: SecretService,
    toastService: ToastService
  ) {
    super('secret', router, matDialog, secretService, toastService);
  }
}
