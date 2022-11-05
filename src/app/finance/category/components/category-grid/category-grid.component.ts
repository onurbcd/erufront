import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Category, CategoryFilter, CategorySave } from '@model';
import { CategoryService, ToastService } from '@service';
import { BaseListDirective } from '@shared';

@Component({
  selector: 'app-category-grid',
  templateUrl: './category-grid.component.html',
  styleUrls: ['./category-grid.component.css'],
})
export class CategoryGridComponent extends BaseListDirective<
  Category,
  CategorySave,
  CategoryFilter,
  string
> {
  displayedColumns: string[] = [
    'name',
    'description',
    'parentName',
    'level',
    'lastBranch',
    'lastModifiedDate',
    'active',
    'config',
  ];

  constructor(
    router: Router,
    matDialog: MatDialog,
    categoryService: CategoryService,
    toastService: ToastService
  ) {
    super('category', router, matDialog, categoryService, toastService);
  }
}
