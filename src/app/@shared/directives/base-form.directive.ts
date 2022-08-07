import { Directive, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Prime } from '@model';
import { ApiService, ToastService } from '@service';
import { Subject, takeUntil } from 'rxjs';

@Directive()
export abstract class BaseFormDirective<E extends Prime<ID>, F, ID>
  implements OnInit, OnDestroy
{
  private unsubscribe$ = new Subject<void>();

  formGroup: FormGroup = new FormGroup({});

  defaultValues: E = {} as E;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService<E, F, ID>,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.defaultValues = {} as E;
    this.buildForm();
    const id = this.activatedRoute.snapshot.params['id'];

    if (!id) {
      return;
    }

    this.apiService
      .get(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((entity) => {
        this.defaultValues = entity;
        this.buildForm();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  protected abstract buildForm(): void;

  save(commands: any[]) {
    if (this.formGroup.invalid) {
      return;
    }

    const entity: E = this.formGroup.value;

    this.apiService
      .save(this.defaultValues.id, entity)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.toastService.showSuccess('global.saveSuccess');
        this.router.navigate(commands);
      });
  }

  clear(path: string): void {
    this.formGroup.get(path)?.reset();
  }
}
