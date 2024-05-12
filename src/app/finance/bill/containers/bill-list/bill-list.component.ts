import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BillFilter } from '@model';
import { AppService, DateService } from '@service';
import { BillGridComponent } from '../../components';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrl: './bill-list.component.css',
})
export class BillListComponent implements OnInit, AfterViewInit {
  billFilter = {} as BillFilter;

  @ViewChild(BillGridComponent)
  gridComponent!: BillGridComponent;

  constructor(
    private dateService: DateService,
    private appService: AppService
  ) {}

  ngOnInit(): void {
    this.billFilter = {} as BillFilter;
    this.billFilter.referenceDayYear = 2022; // this.dateService.getCurrentYear();
    this.billFilter.referenceDayMonth = 9; // this.dateService.getCurrentMonth();
  }

  ngAfterViewInit(): void {
    this.appService.setTitle('finance.bill.listTitle');
    this.gridComponent.search();
  }

  valueChanges(billFilter: BillFilter): void {
    this.billFilter = billFilter;
  }
}
