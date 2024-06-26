import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Balance,
  BalanceFilter,
  BalanceSave,
  BalanceType,
  Category,
  CategoryFilter,
  DocumentData,
  DocumentResult,
  Page,
  Source,
  SourceFilter,
} from '@model';
import {
  BalanceService,
  CategoryService,
  SourceService,
  ToastService,
} from '@service';
import { BaseFormDirective, Debounce, DocumentsComponent } from '@shared';
import * as moment from 'moment';
import { Observable, takeUntil } from 'rxjs';
import { AppConstants } from 'src/app/app-constants';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-balance-form',
  templateUrl: './balance-form.component.html',
  styleUrls: ['./balance-form.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: AppConstants.APP_DATE_FORMAT },
  ],
})
export class BalanceFormComponent
  extends BaseFormDirective<Balance, BalanceSave, BalanceFilter, string>
  implements OnInit
{
  readonly currencyMaskConfig = AppConstants.CURRENCY_MASK_CONFIG;

  sources$!: Observable<Page<Source>>;

  categories$!: Observable<Page<Category>>;

  balanceTypes: BalanceType[] = Object.values(BalanceType);

  balanceTypeFormControl = new FormControl();

  max = moment.utc();

  min = moment.utc({ year: AppConstants.MIN_YEAR, month: 0, day: 1 });

  files: File[] = [];

  numberOfFiles = 0;

  constructor(
    activatedRoute: ActivatedRoute,
    toastService: ToastService,
    router: Router,
    private balanceService: BalanceService,
    private formBuilder: FormBuilder,
    private sourceService: SourceService,
    private categoryService: CategoryService,
    private matDialog: MatDialog
  ) {
    super(activatedRoute, balanceService, toastService, router);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  protected override buildForm(): void {
    const activeDefaultValue =
      this.defaultValues.active == null ? true : this.defaultValues.active;

    const sequenceDefaultValue =
      this.defaultValues.sequence == null ? 1 : this.defaultValues.sequence;

    this.balanceTypeFormControl = new FormControl(
      { value: this.defaultValues.balanceType, disabled: this.id },
      [Validators.required]
    );

    this.formGroup = this.formBuilder.group({
      active: [activeDefaultValue, [Validators.required]],
      sequence: [
        { value: sequenceDefaultValue, disabled: true },
        [Validators.required],
      ],
      dayCalendarDate: [
        { value: this.defaultValues.dayCalendarDate, disabled: this.id },
        [Validators.required],
      ],
      sourceId: [
        { value: this.defaultValues.sourceId, disabled: this.id },
        [Validators.required],
      ],
      categoryId: [this.defaultValues.categoryId, [Validators.required]],
      amount: [this.defaultValues.amount, [Validators.required]],
      code: [
        this.defaultValues.code,
        [Validators.required, Validators.maxLength(AppConstants.LENGTH_150)],
      ],
      description: [
        this.defaultValues.description,
        [Validators.maxLength(AppConstants.LENGTH_250)],
      ],
      balanceType: this.balanceTypeFormControl,
    });
  }

  protected override afterInit(): void {
    this.getSources(this.defaultValues.sourceName);
    this.getCategories(this.defaultValues.categoryName);

    this.numberOfFiles = this.defaultValues.documents
      ? this.defaultValues.documents.length
      : 0;
  }

  @Debounce(1000)
  searchSources(searchInput: string): void {
    if (!searchInput || searchInput.trim().length < 3) {
      return;
    }

    this.getSources(searchInput);
  }

  @Debounce(1000)
  searchCategories(searchInput: string): void {
    if (!searchInput || searchInput.trim().length < 3) {
      return;
    }

    this.getCategories(searchInput);
  }

  saveBalance(commands: any[]): void {
    if (this.formGroup.invalid) {
      return;
    }

    const currentDocumentsIds = this.defaultValues.documents
      ? this.defaultValues.documents
          .filter((value) => value.id !== '')
          .map((value) => value.id)
      : [];

    const balanceSave: BalanceSave = this.formGroup.getRawValue();
    balanceSave.documentsIds = currentDocumentsIds;

    this.balanceService
      .saveBalance(this.id, balanceSave, this.files)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.afterSave(commands));
  }

  openDocumentsDialog(event: MouseEvent): void {
    event.stopPropagation();

    const dialogRef = this.matDialog.open(DocumentsComponent, {
      data: new DocumentData(this.defaultValues.documents),
      disableClose: true,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((documentResult: DocumentResult) => {
        if (documentResult) {
          this.defaultValues.documents = cloneDeep(documentResult.documents);
          this.numberOfFiles = this.defaultValues.documents.length;
          this.files = cloneDeep(documentResult.files);
        }
      });
  }

  private getSources(search: string): void {
    this.sources$ = this.sourceService.getAll(
      { search } as SourceFilter,
      {
        pageIndex: 0,
        pageSize: AppConstants.PAGE_SIZE_SELECT,
        length: 0,
      },
      {
        active: 'name',
        direction: 'asc',
      }
    );
  }

  private getCategories(search: string): void {
    this.categories$ = this.categoryService.getAll(
      { search } as CategoryFilter,
      {
        pageIndex: 0,
        pageSize: AppConstants.PAGE_SIZE_SELECT,
        length: 0,
      },
      {
        active: 'name',
        direction: 'asc',
      }
    );
  }
}
