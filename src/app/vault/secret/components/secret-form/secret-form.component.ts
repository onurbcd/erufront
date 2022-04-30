import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Secret, SecretFilter } from '@model';
import { SecretService, ToastService } from '@service';
import { BaseFormDirective } from '@shared/directives/base-form.directive';
import { AppConstants } from 'src/app/app-constants';

@Component({
  selector: 'app-secret-form',
  templateUrl: './secret-form.component.html',
  styleUrls: ['./secret-form.component.css'],
})
export class SecretFormComponent
  extends BaseFormDirective<Secret, SecretFilter, string>
  implements OnInit
{
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
      name: [
        this.defaultValues.name,
        [
          Validators.required,
          Validators.minLength(AppConstants.LENGTH_3),
          Validators.maxLength(AppConstants.LENGTH_50),
        ],
      ],
      description: [
        this.defaultValues.description,
        [
          Validators.minLength(AppConstants.LENGTH_5),
          Validators.maxLength(AppConstants.LENGTH_250),
        ],
      ],
      link: [
        this.defaultValues.link,
        [
          Validators.pattern(AppConstants.URL_PATTERN),
          Validators.minLength(AppConstants.LENGTH_7),
          Validators.maxLength(AppConstants.LENGTH_2048),
        ],
      ],
      username: [
        this.defaultValues.username,
        [
          Validators.required,
          Validators.minLength(AppConstants.LENGTH_3),
          Validators.maxLength(AppConstants.LENGTH_50),
        ],
      ],
      password: [
        this.defaultValues.password,
        [
          Validators.required,
          Validators.minLength(AppConstants.LENGTH_3),
          Validators.maxLength(AppConstants.LENGTH_50),
        ],
      ],
    });
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }
}
