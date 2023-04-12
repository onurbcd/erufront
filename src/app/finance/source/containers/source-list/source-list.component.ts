import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SourceFilter } from '@model';
import { AppService } from '@service';
import { SourceGridComponent, SourceValuesComponent } from '../../components';

@Component({
  selector: 'app-source-list',
  templateUrl: './source-list.component.html',
  styleUrls: ['./source-list.component.css'],
})
export class SourceListComponent implements OnInit, AfterViewInit {
  sourceFilter: SourceFilter = {} as SourceFilter;

  sourceValuesFilter: SourceFilter = {} as SourceFilter;

  @ViewChild(SourceGridComponent)
  gridComponent!: SourceGridComponent;

  @ViewChild(SourceValuesComponent)
  valuesComponent!: SourceValuesComponent;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.sourceFilter = {} as SourceFilter;
    this.sourceValuesFilter = {} as SourceFilter;
  }

  ngAfterViewInit(): void {
    this.appService.setTitle('finance.source.listTitle');
    this.gridComponent.search();
  }

  valueChanges(sourceFilter: SourceFilter): void {
    this.sourceFilter = sourceFilter;
  }

  filterChange(sourceFilter: SourceFilter): void {
    this.sourceValuesFilter = sourceFilter;
  }

  listChanged(): void {
    this.valuesComponent.getSourceSum();
  }

  restart(cleanData: boolean): void {
    this.gridComponent.reset(cleanData);
    this.valuesComponent.resetSourceSum();
  }
}
