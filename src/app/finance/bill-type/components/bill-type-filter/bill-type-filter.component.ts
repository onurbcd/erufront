import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BillTypeFilter } from '@model';
import { BaseFilterDirective } from '@shared';

@Component({
  selector: 'app-bill-type-filter',
  templateUrl: './bill-type-filter.component.html',
  styleUrls: ['./bill-type-filter.component.css'],
})
export class BillTypeFilterComponent
  extends BaseFilterDirective<BillTypeFilter>
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
