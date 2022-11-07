import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, CategoryFilter, CategorySave, Page } from '@model';
import { CategoryService, ToastService } from '@service';
import { AppConstants } from 'src/app/app-constants';
import { Debounce, BaseFormDirective } from '@shared';
import { Observable } from 'rxjs';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
})
export class CategoryFormComponent
  extends BaseFormDirective<Category, CategorySave, CategoryFilter, string>
  implements OnInit
{
  categories$!: Observable<Page<Category>>;

  private lastBranchDefaultValue = false;

  constructor(
    activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    toastService: ToastService,
    router: Router,
    private formBuilder: FormBuilder
  ) {
    super(activatedRoute, categoryService, toastService, router);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  protected buildForm(): void {
    const levelDefaultValue =
      this.defaultValues.level == null ? 1 : this.defaultValues.level;

    this.lastBranchDefaultValue =
      this.defaultValues.lastBranch == null
        ? true
        : this.defaultValues.lastBranch;

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
      description: [
        this.defaultValues.description,
        [
          Validators.minLength(AppConstants.LENGTH_3),
          Validators.maxLength(AppConstants.LENGTH_250),
        ],
      ],
      parentId: [this.defaultValues.parentId, [Validators.required]],
      parentName: [this.defaultValues.parentName],
      level: [levelDefaultValue, [Validators.required]],
      lastBranch: [this.lastBranchDefaultValue, [Validators.required]],
      active: [activeDefaultValue, [Validators.required]],
    });
  }

  @Debounce(1000)
  searchCategory(searchInput: string): void {
    if (!searchInput || searchInput.trim().length < 3) {
      return;
    }

    this.getCategories(searchInput);
  }

  lastBranchChange(change: MatSlideToggleChange): void {
    this.formGroup.get('lastBranch')?.setValue(this.lastBranchDefaultValue);
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
