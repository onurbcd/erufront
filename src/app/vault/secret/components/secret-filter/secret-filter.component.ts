import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Secret } from '@model';
import { BaseFilterDirective } from '@shared';

@Component({
  selector: 'app-secret-filter',
  templateUrl: './secret-filter.component.html',
  styleUrls: ['./secret-filter.component.css'],
})
export class SecretFilterComponent
  extends BaseFilterDirective<Secret>
  implements OnInit
{
  searchFormControl = new FormControl('');

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  protected buildForm(): FormGroup {
    return this.formBuilder.group({
      search: this.searchFormControl,
    });
  }

  protected resetForm(path: string): void {
    this.formGroup.get(path)?.reset();
  }
}
