import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { SecretFilter } from '@model';
import { BaseFilterDirective } from '@shared';
import { AppConstants } from 'src/app/app-constants';

@Component({
  selector: 'app-secret-filter',
  templateUrl: './secret-filter.component.html',
  styleUrls: ['./secret-filter.component.css'],
})
export class SecretFilterComponent
  extends BaseFilterDirective<SecretFilter>
  implements OnInit
{
  searchFormControl = new FormControl('', [
    Validators.minLength(AppConstants.LENGTH_3),
    Validators.maxLength(AppConstants.LENGTH_250),
  ]);

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  protected buildForm(): void {
    this.formGroup = this.formBuilder.group({
      search: this.searchFormControl,
    });
  }

  protected resetForm(path: string): void {
    this.formGroup.get(path)?.reset();
  }
}
