import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IncomeSourceFilter } from '@model';
import { AppService } from '@service';
import { IncomeSourceGridComponent } from '../../components';

@Component({
  selector: 'app-income-source-list',
  templateUrl: './income-source-list.component.html',
  styleUrls: ['./income-source-list.component.css'],
})
export class IncomeSourceListComponent implements OnInit, AfterViewInit {
  incomeSourceFilter!: IncomeSourceFilter;

  @ViewChild(IncomeSourceGridComponent)
  gridComponent!: IncomeSourceGridComponent;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.incomeSourceFilter = {} as IncomeSourceFilter;
  }

  ngAfterViewInit(): void {
    this.appService.setTitle('finance.incomeSource.listTitle');
    this.gridComponent.search();
  }

  valueChanges(incomeSourceFilter: IncomeSourceFilter): void {
    this.incomeSourceFilter = incomeSourceFilter;
  }
}
