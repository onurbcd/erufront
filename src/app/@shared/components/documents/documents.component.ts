import { formatNumber } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  LOCALE_ID,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Document, DocumentData, DocumentResult } from '@model';
import { DocumentService, ToastService } from '@service';
import { cloneDeep } from 'lodash';
import { Subject, takeUntil } from 'rxjs';
import { AppConstants } from 'src/app/app-constants';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
})
export class DocumentsComponent implements OnDestroy {
  private unsubscribe$ = new Subject<void>();

  dataSource: Document[] = [];

  displayedColumns = ['name', 'path', 'mimeType', 'size', 'config'];

  private rows: any[] = [];

  fileList: File[] = [];

  numberOfFiles = 0;

  totalSize = 0;

  @ViewChild('fileUpload', { static: false })
  fileUploadRef!: ElementRef;

  constructor(
    @Inject(MAT_DIALOG_DATA) public documentData: DocumentData,
    private matDialogRef: MatDialogRef<DocumentsComponent>,
    private toastService: ToastService,
    @Inject(LOCALE_ID) public locale: string,
    private documentService: DocumentService
  ) {
    if (documentData.documents) {
      this.dataSource = cloneDeep(documentData.documents);
      this.calculateIndicators();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    const dataSourceAux = cloneDeep(this.dataSource);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (this.fileDuplicated(file)) {
        continue;
      }

      this.fileList.push(file);

      dataSourceAux.push(
        new Document('', file.name, '', file.type, file.size, '')
      );
    }

    this.dataSource = dataSourceAux;
    this.calculateIndicators();
    this.fileUploadRef.nativeElement.value = '';
  }

  deleteDocument(event: MouseEvent, document: Document, i: number): void {
    event.stopPropagation();
    const dataSourceAux = cloneDeep(this.dataSource);
    dataSourceAux.splice(i, 1);

    if (document.id === '') {
      const index = this.fileList.findIndex((value) => {
        return (
          value.name === document.name &&
          value.type === document.mimeType &&
          value.size === document.size
        );
      });

      if (index !== -1) {
        this.fileList.splice(index, 1);
      }
    }

    this.dataSource = dataSourceAux;
    this.calculateIndicators();
  }

  gridRowSelected(row: any): void {
    row.selected = !row.selected;

    for (const loopRow of this.rows) {
      loopRow.selected = false;
    }

    this.rows = [];

    if (row.selected === true) {
      this.rows.push(row);
    }
  }

  onConfirmClick(): void {
    const maxUploadSize =
      this.fileList.length > 0
        ? this.fileList
            .map((value) => value.size)
            .reduce((prev, next) => prev + next)
        : 0;

    if (maxUploadSize > AppConstants.MAX_UPLOAD_SIZE) {
      this.toastService.showError('shared.documents.maxUploadSize', {
        maxUploadSize: formatNumber(AppConstants.MAX_UPLOAD_SIZE, this.locale),
      });

      return;
    }

    const documentResult = new DocumentResult(this.dataSource, this.fileList);
    this.matDialogRef.close(documentResult);
  }

  viewDocument(event: MouseEvent, id: string): void {
    event.stopPropagation();

    this.documentService
      .getFile(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((blob) => {
        const objectUrl = URL.createObjectURL(blob);
        window.open(objectUrl, '_blank');
        URL.revokeObjectURL(objectUrl);
      });
  }

  private fileDuplicated(file: File): boolean {
    const found = this.fileList.find((item) => {
      return (
        item.name === file.name &&
        item.type === file.type &&
        item.size === file.size
      );
    });

    if (found) {
      this.toastService.showError('shared.documents.fileDuplicated');
      return true;
    }

    return false;
  }

  private calculateIndicators(): void {
    this.numberOfFiles = this.dataSource.length;

    this.totalSize =
      this.dataSource.length > 0
        ? this.dataSource
            .map((value) => value.size)
            .reduce((prev, next) => prev + next)
        : 0;
  }
}
