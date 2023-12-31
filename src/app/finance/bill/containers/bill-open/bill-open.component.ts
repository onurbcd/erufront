import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  BillOpen,
  Budget,
  BudgetFilter,
  Document,
  DocumentData,
  DocumentResult,
  DocumentType,
  Page,
  ReferenceType,
} from '@model';
import { AppService, BillService, BudgetService, ToastService } from '@service';
import { Observable, Subject, takeUntil } from 'rxjs';
import * as moment from 'moment';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { AppConstants } from 'src/app/app-constants';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { DocumentsComponent } from '@shared';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-bill-open',
  templateUrl: './bill-open.component.html',
  styleUrl: './bill-open.component.css',
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: AppConstants.APP_DATE_FORMAT },
  ],
})
export class BillOpenComponent implements OnInit, OnDestroy, AfterViewInit {
  unsubscribe$ = new Subject<void>();

  budgets$!: Observable<Page<Budget>>;

  formGroup: FormGroup = new FormGroup({});

  documentTypes: DocumentType[] = Object.values(DocumentType).sort();

  documentTypeFormControl = new FormControl();

  referenceTypes: ReferenceType[] = Object.values(ReferenceType);

  referenceTypeFormControl = new FormControl();

  max = moment.utc();

  min = moment.utc({ year: AppConstants.MIN_YEAR, month: 0, day: 1 });

  private selectedRefYear = 0;

  private selectedRefMonth = 0;

  file: File = {} as File;

  numberOfFiles = 0;

  billDocument = {} as Document;

  constructor(
    private appService: AppService,
    private toastService: ToastService,
    private router: Router,
    private billService: BillService,
    private formBuilder: FormBuilder,
    private budgetService: BudgetService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  ngAfterViewInit(): void {
    this.appService.setTitle('finance.bill.openTitle');
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  clear(path: string): void {
    this.formGroup.get(path)?.reset();
  }

  referenceDayDateChange(event: MatDatepickerInputEvent<moment.Moment>) {
    if (event.value != null && event.value != undefined) {
      const refYear = event.value.year();
      const refMonth = event.value.month() + 1;

      if (
        this.selectedRefYear != refYear &&
        this.selectedRefMonth != refMonth
      ) {
        this.selectedRefYear = refYear;
        this.selectedRefMonth = refMonth;
        this.getBudgets(refYear, refMonth);
      }
    }
  }

  openDocumentsDialog(event: MouseEvent): void {
    event.stopPropagation();

    const dialogRef = this.matDialog.open(DocumentsComponent, {
      data: new DocumentData(
        this.billDocument && this.billDocument.name ? [this.billDocument] : []
      ),
      disableClose: true,
    });

    dialogRef.componentInstance.multipleFiles = false;

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((documentResult: DocumentResult) => {
        if (documentResult) {
          const documents = cloneDeep(documentResult.documents);
          this.billDocument = documents[0];
          this.numberOfFiles = documents.length;
          const files = cloneDeep(documentResult.files);
          this.file = files[0];
        }
      });
  }

  saveBill(commands: any[]): void {
    const billOpen: BillOpen = this.formGroup.getRawValue();

    this.billService
      .openBill(billOpen, this.file)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.afterSave(commands));
  }

  private buildForm(): void {
    this.documentTypeFormControl = new FormControl('', [Validators.required]);
    this.referenceTypeFormControl = new FormControl('', [Validators.required]);

    this.formGroup = this.formBuilder.group({
      referenceDayCalendarDate: ['', [Validators.required]],
      documentDateCalendarDate: ['', [Validators.required]],
      dueDateCalendarDate: ['', [Validators.required]],
      observation: ['', [Validators.maxLength(AppConstants.LENGTH_250)]],
      installment: ['', [Validators.min(1)]],
      documentType: this.documentTypeFormControl,
      budgetId: ['', [Validators.required]],
      referenceType: this.referenceTypeFormControl,
    });
  }

  private getBudgets(refYear: number, refMonth: number): void {
    this.budgets$ = this.budgetService.getAll(
      { refYear, refMonth, paid: false, active: true } as BudgetFilter,
      {
        pageIndex: 0,
        pageSize: 100,
        length: 0,
      },
      {
        active: 'sequence',
        direction: 'asc',
      }
    );
  }

  private afterSave(commands: any[]): void {
    this.toastService.showSuccess('global.saveSuccess');
    this.router.navigate(commands);
  }
}
