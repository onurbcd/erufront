import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BillType, BillTypeFilter } from '@model';
import { BillTypeService, ToastService } from '@service';
import { BaseFormDirective } from '@shared/directives/base-form.directive';
import { AppConstants } from 'src/app/app-constants';

@Component({
  selector: 'app-bill-type-form',
  templateUrl: './bill-type-form.component.html',
  styleUrls: ['./bill-type-form.component.css'],
})
export class BillTypeFormComponent
  extends BaseFormDirective<BillType, BillTypeFilter, string>
  implements OnInit
{
  constructor(
    activatedRoute: ActivatedRoute,
    billTypeService: BillTypeService,
    toastService: ToastService,
    router: Router,
    private formBuilder: FormBuilder
  ) {
    super(activatedRoute, billTypeService, toastService, router);
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
