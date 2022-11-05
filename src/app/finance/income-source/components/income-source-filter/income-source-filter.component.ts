import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IncomeSourceFilter } from '@model';
import { BaseFilterDirective } from '@shared';

@Component({
  selector: 'app-income-source-filter',
  templateUrl: './income-source-filter.component.html',
  styleUrls: ['./income-source-filter.component.css'],
})
export class IncomeSourceFilterComponent
  extends BaseFilterDirective<IncomeSourceFilter>
  implements OnInit
{
  constructor(private formBuilder: FormBuilder) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  protected buildForm(): void {
    this.formGroup = this.formBuilder.group({
      search: this.searchFormControl,
      active: this.activeFormControl,
    });
  }
}
