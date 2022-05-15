import { AfterViewInit, Component } from '@angular/core';
import { AppService } from '@service';

@Component({
  selector: 'app-bill-type-creation',
  templateUrl: './bill-type-creation.component.html',
  styleUrls: ['./bill-type-creation.component.css'],
})
export class BillTypeCreationComponent implements AfterViewInit {
  constructor(private appService: AppService) {}

  ngAfterViewInit(): void {
    this.appService.setTitle('finance.billType.formTitle');
  }
}
