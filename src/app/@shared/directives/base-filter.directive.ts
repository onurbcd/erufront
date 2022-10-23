import {
  Directive,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AppConstants } from 'src/app/app-constants';

@Directive()
export abstract class BaseFilterDirective<T> implements OnInit, OnDestroy {
  protected unsubscribe$ = new Subject<void>();

  formGroup!: FormGroup;

  searchFormControl = new FormControl('', [
    Validators.minLength(AppConstants.LENGTH_3),
    Validators.maxLength(AppConstants.LENGTH_50),
  ]);

  activeFormControl = new FormControl('');

  @Output() restart: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() search: EventEmitter<T> = new EventEmitter<T>();

  @Output() valueChanges: EventEmitter<T> = new EventEmitter<T>();

  constructor() {}

  ngOnInit(): void {
    this.buildForm();

    this.formGroup.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((value) => {
        this.valueChanges.next(value);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  protected abstract buildForm(): void;

  resetForm(path: string): void {
    this.formGroup.get(path)?.reset();
  }

  filterSearch(): void {
    if (this.formGroup.invalid) {
      return;
    }

    this.search.next(this.formGroup.value);
  }

  filterClear(path: string): void {
    this.resetForm(path);
    this.restart.next(true);
  }
}
