import { SourcesDataSource } from './../model/SourcesDataSource';
import { ISource } from './../model/ISource';
import { DataSource } from '@angular/cdk/collections';
import { SourceService } from './../services/source.service';
import { CustomTitleService } from './../services/custom-title.service';
import { Component } from '@angular/core';

@Component({
  selector: 'facts',
  styleUrls: [ './facts.component.css' ],
  templateUrl: './facts.component.html'
})
export class FactsComponent {
  public dataSource: SourcesDataSource;
  public displayedColumns: string[] = ['source', 'facts'];

  constructor(public sourceService: SourceService, title: CustomTitleService) {
    title.detailTitle = 'Fakten';
    title.description = 'Erfahren Sie mehr rund um den Fleischkonsum';
    this.dataSource = new SourcesDataSource(sourceService.sources);
  }
}
