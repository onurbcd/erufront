import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BillTypeFilter } from '@model';
import { AppService } from '@service';

@Component({
  selector: 'app-bill-type-list',
  templateUrl: './bill-type-list.component.html',
  styleUrls: ['./bill-type-list.component.css'],
})
export class BillTypeListComponent implements OnInit, AfterViewInit {
  billTypeFilter!: BillTypeFilter;

  // @ViewChild(SecretGridComponent)
  // gridComponent!: SecretGridComponent;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.billTypeFilter = {} as BillTypeFilter;
  }

  ngAfterViewInit(): void {
    this.appService.setTitle('finance.billType.listTitle');
    // this.gridComponent.search();
  }

  valueChanges(billTypeFilter: BillTypeFilter): void {
    this.billTypeFilter = billTypeFilter;
  }
}
