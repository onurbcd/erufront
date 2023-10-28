import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BillType,
  BillTypeFilter,
  BillTypeSave,
  Category,
  CategoryFilter,
  Page,
} from '@model';
import { BillTypeService, CategoryService, ToastService } from '@service';
import { BaseFormDirective, Debounce } from '@shared';
import { Observable } from 'rxjs';
import { AppConstants } from 'src/app/app-constants';

@Component({
  selector: 'app-bill-type-form',
  templateUrl: './bill-type-form.component.html',
  styleUrls: ['./bill-type-form.component.css'],
})
export class BillTypeFormComponent
  extends BaseFormDirective<BillType, BillTypeSave, BillTypeFilter, string>
  implements OnInit
{
  categories$!: Observable<Page<Category>>;

  constructor(
    activatedRoute: ActivatedRoute,
    billTypeService: BillTypeService,
    toastService: ToastService,
    router: Router,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
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
      path: [
        this.defaultValues.path,
        [Validators.required, Validators.maxLength(AppConstants.LENGTH_250)],
      ],
      active: [activeDefaultValue, [Validators.required]],
      categoryId: [this.defaultValues.categoryId, [Validators.required]],
    });
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  protected override afterInit(): void {
    this.getCategories(this.defaultValues.categoryName);
  }

  @Debounce(1000)
  searchCategories(searchInput: string): void {
    if (!searchInput || searchInput.trim().length < 3) {
      return;
    }

    this.getCategories(searchInput);
  }

  private getCategories(search: string): void {
    this.categories$ = this.categoryService.getAll(
      { search } as CategoryFilter,
      {
        pageIndex: 0,
        pageSize: AppConstants.PAGE_SIZE_SELECT,
        length: 0,
      },
      {
        active: 'name',
        direction: 'asc',
      }
    );
  }
}
