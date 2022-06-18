import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SecretFilter } from '@model';
import { BaseFilterDirective } from '@shared';

@Component({
  selector: 'app-secret-filter',
  templateUrl: './secret-filter.component.html',
  styleUrls: ['./secret-filter.component.css'],
})
export class SecretFilterComponent
  extends BaseFilterDirective<SecretFilter>
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

  protected resetForm(path: string): void {
    this.formGroup.get(path)?.reset();
  }
}
