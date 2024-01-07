import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BillFilter } from '@model';
import { AppService } from '@service';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrl: './bill-list.component.css',
})
export class BillListComponent implements OnInit, AfterViewInit {
  billFilter = {} as BillFilter;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  ngAfterViewInit(): void {
    this.appService.setTitle('finance.bill.listTitle');
  }
}
