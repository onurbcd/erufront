import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BudgetFilter } from '@model';
import { AppService } from '@service';
import { BudgetGridComponent } from '../../components';

@Component({
  selector: 'app-budget-list',
  templateUrl: './budget-list.component.html',
  styleUrls: ['./budget-list.component.css'],
})
export class BudgetListComponent implements OnInit, AfterViewInit {
  budgetFilter!: BudgetFilter;

  @ViewChild(BudgetGridComponent)
  gridComponent!: BudgetGridComponent;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.budgetFilter = {} as BudgetFilter;
  }

  ngAfterViewInit(): void {
    this.appService.setTitle('finance.budget.listTitle');
    this.gridComponent.search();
  }

  valueChanges(budgetFilter: BudgetFilter): void {
    this.budgetFilter = budgetFilter;
  }
}
