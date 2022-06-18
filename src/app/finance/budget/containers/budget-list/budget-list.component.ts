import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BudgetFilter } from '@model';
import { AppService } from '@service';

@Component({
  selector: 'app-budget-list',
  templateUrl: './budget-list.component.html',
  styleUrls: ['./budget-list.component.css'],
})
export class BudgetListComponent implements OnInit, AfterViewInit {
  budgetFilter!: BudgetFilter;

  // @ViewChild(BillTypeGridComponent)
  // gridComponent!: BillTypeGridComponent;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.budgetFilter = {} as BudgetFilter;
  }

  ngAfterViewInit(): void {
    this.appService.setTitle('finance.budget.listTitle');
    // this.gridComponent.search();
  }

  valueChanges(budgetFilter: BudgetFilter): void {
    this.budgetFilter = budgetFilter;
  }
}
