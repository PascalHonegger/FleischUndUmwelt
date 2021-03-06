import { Component } from '@angular/core';

import { SourcesDataSource } from './../model/sources-data-source.model';
import { SourceService } from './../services/source.service';
import { CustomTitleService } from './../services/custom-title.service';

@Component({
  selector: 'facts',
  styleUrls: [ './facts.component.css' ],
  templateUrl: './facts.component.html'
})
export class FactsComponent {
  public dataSource: SourcesDataSource;
  public displayedColumns: string[] = ['source', 'facts'];

  constructor(public readonly sourceService: SourceService,
              title: CustomTitleService) {
    title.detailTitle = 'Fakten';
    title.description = 'Erfahren Sie mehr rund um den Fleischrechner';
    this.dataSource = new SourcesDataSource(sourceService.sources);
  }
}
