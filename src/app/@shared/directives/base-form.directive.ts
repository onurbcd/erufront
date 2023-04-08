import { Directive, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Filter, Prime, PrimeSave } from '@model';
import { ApiService, ToastService } from '@service';
import { Subject, takeUntil } from 'rxjs';

@Directive()
export abstract class BaseFormDirective<
  E extends Prime<ID>,
  S extends PrimeSave,
  F extends Filter,
  ID
> implements OnInit, OnDestroy
{
  protected unsubscribe$ = new Subject<void>();

  id?: any;

  formGroup: FormGroup = new FormGroup({});

  defaultValues: E = {} as E;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService<E, S, F, ID>,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.defaultValues = {} as E;
    this.buildForm();
    this.id = this.activatedRoute.snapshot.params['id'];

    if (!this.id) {
      return;
    }

    this.apiService
      .get(this.id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((entity) => {
        this.defaultValues = entity;
        this.buildForm();
        this.afterInit();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  protected abstract buildForm(): void;

  protected afterInit(): void {}

  protected afterSave(commands: any[]): void {
    this.toastService.showSuccess('global.saveSuccess');
    this.router.navigate(commands);
  }

  save(commands: any[]) {
    if (this.formGroup.invalid) {
      return;
    }

    const save: S = this.formGroup.value;

    this.apiService
      .save(this.id, save)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.afterSave(commands));
  }

  clear(path: string): void {
    this.formGroup.get(path)?.reset();
  }
}
