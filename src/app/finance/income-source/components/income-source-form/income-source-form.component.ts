import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IncomeSource, IncomeSourceFilter, IncomeSourceSave } from '@model';
import { IncomeSourceService, ToastService } from '@service';
import { BaseFormDirective } from '@shared';
import { AppConstants } from 'src/app/app-constants';

@Component({
  selector: 'app-income-source-form',
  templateUrl: './income-source-form.component.html',
  styleUrls: ['./income-source-form.component.css'],
})
export class IncomeSourceFormComponent
  extends BaseFormDirective<
    IncomeSource,
    IncomeSourceSave,
    IncomeSourceFilter,
    string
  >
  implements OnInit
{
  constructor(
    activatedRoute: ActivatedRoute,
    incomeSourceService: IncomeSourceService,
    toastService: ToastService,
    router: Router,
    private formBuilder: FormBuilder
  ) {
    super(activatedRoute, incomeSourceService, toastService, router);
  }

  protected buildForm(): void {
    const activeDefaultValue =
      this.defaultValues.active == null ? true : this.defaultValues.active;

    this.formGroup = this.formBuilder.group({
      name: [
        this.defaultValues.name,
        [
          Validators.required,
          Validators.minLength(AppConstants.LENGTH_3),
          Validators.maxLength(AppConstants.LENGTH_50),
        ],
      ],
      active: [activeDefaultValue, [Validators.required]],
    });
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }
}
