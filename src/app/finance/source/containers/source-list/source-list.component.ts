import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SourceFilter } from '@model';
import { AppService } from '@service';
// import { SourceGridComponent } from '../../components';

@Component({
  selector: 'app-source-list',
  templateUrl: './source-list.component.html',
  styleUrls: ['./source-list.component.css'],
})
export class SourceListComponent implements OnInit, AfterViewInit {
  sourceFilter!: SourceFilter;

  // @ViewChild(SourceGridComponent)
  // gridComponent!: SourceGridComponent;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.sourceFilter = {} as SourceFilter;
  }

  ngAfterViewInit(): void {
    this.appService.setTitle('finance.source.listTitle');
    // this.gridComponent.search();
  }

  valueChanges(sourceFilter: SourceFilter): void {
    this.sourceFilter = sourceFilter;
  }
}
