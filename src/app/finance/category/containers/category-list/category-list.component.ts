import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CategoryFilter } from '@model';
import { AppService } from '@service';
import { CategoryGridComponent } from '../../components';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit, AfterViewInit {
  categoryFilter!: CategoryFilter;

  @ViewChild(CategoryGridComponent)
  gridComponent!: CategoryGridComponent;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.categoryFilter = {} as CategoryFilter;
  }

  ngAfterViewInit(): void {
    this.appService.setTitle('finance.category.listTitle');
    this.gridComponent.search();
  }

  valueChanges(categoryFilter: CategoryFilter): void {
    this.categoryFilter = categoryFilter;
  }
}
