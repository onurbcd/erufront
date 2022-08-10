import {
  Directive,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Prime, Sequence } from '@model';
import { ApiService, ToastService } from '@service';
import { ConfirmDialogComponent } from '@shared/components';
import { Subject, takeUntil } from 'rxjs';
import { AppConstants } from 'src/app/app-constants';

@Directive()
export abstract class BaseListDirective<E extends Prime<ID>, F, ID>
  implements OnDestroy
{
  readonly pageSizeOptions = AppConstants.PAGE_SIZE_OPTIONS;

  private unsubscribe$ = new Subject<void>();

  private defaultPageEvent: PageEvent = {
    pageIndex: 0,
    pageSize: AppConstants.PAGE_SIZE,
    length: 0,
  };

  protected defaultSort: Sort = {
    active: 'name',
    direction: 'asc',
  };

  dataSource: E[] = [];

  length = 0;

  @Input() value: F = {} as F;

  @Output() listChanged: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild(MatPaginator) protected matPaginator!: MatPaginator;

  @ViewChild(MatSort) protected matSort!: MatSort;

  constructor(
    private name: string,
    private router: Router,
    private matDialog: MatDialog,
    private apiService: ApiService<E, F, ID>,
    private toastService: ToastService
  ) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  search(): void {
    this.reset(false);
    this.getItems(this.defaultPageEvent, this.defaultSort);
  }

  reset(cleanData: boolean): void {
    this.resetPage(cleanData);
    this.resetSort();
  }

  page(pageEvent: PageEvent): void {
    this.getItems(
      pageEvent,
      this.chooseSort({
        active: this.matSort.active,
        direction: this.matSort.direction,
      })
    );
  }

  sort(sort: Sort): void {
    this.resetPage(false);
    this.getItems(this.defaultPageEvent, this.chooseSort(sort));
  }

  edit(id: ID): void {
    this.router.navigate([`/${this.name}/${id}/edit`]);
  }

  delete(id: ID): void {
    const dialogRef = this.matDialog.open(ConfirmDialogComponent);

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.apiService
            .delete(id)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(() => {
              this.listChanged.next();

              this.toastService.showSuccess('shared.deleteSuccess', {
                name: this.name,
                id,
              });

              this.search();
            });
        }
      });
  }

  changeStatus(id: ID, checked: boolean, property: string = 'active'): void {
    this.apiService
      .changeStatus(id, checked, property)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.listChanged.next();

        this.toastService.showSuccess('shared.changeStatusSuccess', {
          name: this.name,
          id,
        });

        this.search();
      });
  }

  updateSequence(sequence: Sequence): void {
    this.apiService
      .updateSequence(sequence)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.listChanged.next();
        this.toastService.showSuccess('shared.updateSequence');
        this.search();
      });
  }

  private getItems(pageEvent: PageEvent, sort: Sort): void {
    setTimeout(() => {
      this.apiService
        .getAll(this.value, pageEvent, sort)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((data) => {
          this.dataSource = data.content;
          this.length = data.totalElements;
        });
    }, 0);
  }

  private resetPage(cleanData: boolean): void {
    this.matPaginator.pageIndex = 0;

    if (cleanData) {
      this.dataSource = [];
      this.length = 0;
    }
  }

  private resetSort(): void {
    this.matSort.active = '';
    this.matSort.direction = '';
    this.matSort._stateChanges.next();
  }

  private chooseSort(sort: Sort): Sort {
    if (!sort.active || !sort.direction) {
      return this.defaultSort;
    }

    return sort;
  }
}
