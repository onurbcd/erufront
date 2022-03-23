import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SecretFilter } from '@model';
import { AppService } from '@service';
import { SecretGridComponent } from '../../components';

@Component({
  selector: 'app-secret-list',
  templateUrl: './secret-list.component.html',
  styleUrls: ['./secret-list.component.css'],
})
export class SecretListComponent implements OnInit, AfterViewInit {
  secretFilter!: SecretFilter;

  @ViewChild(SecretGridComponent)
  gridComponent!: SecretGridComponent;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.secretFilter = {} as SecretFilter;
  }

  ngAfterViewInit(): void {
    this.appService.setTitle('vault.secret.listTitle');
    this.gridComponent.search();
  }

  valueChanges(secretFilter: SecretFilter): void {
    this.secretFilter = secretFilter;
  }
}
