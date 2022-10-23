import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { CategoryFilter, Page, Category } from '@model';
import { CategoryService } from '@service';
import { BaseFilterDirective, Debounce } from '@shared';
import { Observable } from 'rxjs';
import { AppConstants } from 'src/app/app-constants';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.css'],
})
export class CategoryFilterComponent
  extends BaseFilterDirective<CategoryFilter>
  implements OnInit
{
  categories$!: Observable<Page<Category>>;

  lastBranchFormControl = new FormControl('');

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.getCategories('');
  }

  protected buildForm(): void {
    this.formGroup = this.formBuilder.group({
      search: this.searchFormControl,
      active: this.activeFormControl,
      parentId: [''],
      level: [''],
      lastBranch: this.lastBranchFormControl,
    });
  }

  @Debounce(1000)
  searchCategory(searchInput: string): void {
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
