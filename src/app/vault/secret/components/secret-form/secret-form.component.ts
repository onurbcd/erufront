import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Secret, SecretFilter } from '@model';
import { SecretService, ToastService } from '@service';
import { BaseFormDirective } from '@shared/directives/base-form.directive';

@Component({
  selector: 'app-secret-form',
  templateUrl: './secret-form.component.html',
  styleUrls: ['./secret-form.component.css'],
})
export class SecretFormComponent extends BaseFormDirective<
  Secret,
  SecretFilter,
  string
> {
  constructor(
    activatedRoute: ActivatedRoute,
    secretService: SecretService,
    toastService: ToastService,
    router: Router,
    private formBuilder: FormBuilder
  ) {
    super(activatedRoute, secretService, toastService, router);
  }

  protected buildForm(): void {
    this.formGroup = this.formBuilder.group({
      name: [''],
      description: [''],
      link: [''],
      username: [''],
      password: [''],
    });
  }
}
