import { DataSource, CollectionViewer } from '@angular/cdk/collections';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/merge';
import { map } from 'rxjs/operators/map';

import { Source } from './source.model';

export class SourcesDataSource extends DataSource<Source> {
    private _filter: string = '';
    private filterChanged: BehaviorSubject<string> = new BehaviorSubject('');

    public get filter(): string {
        return this._filter;
    }

    public set filter(value: string) {
        if (this._filter === value) {
            return;
        }

        this._filter = value;
        this.filterChanged.next(value);
    }

    constructor(private readonly sources: Source[]) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Source[]> {
        return Observable
            .merge(this.filterChanged)
            .pipe(
                map((filterString) =>
                this.sources.filter((s) => {
                    if (!filterString) {
                        return true;
                    }
                    const upperFilter = filterString.toUpperCase();
                    return s.title.toUpperCase().includes(upperFilter) ||
                        s.description.toUpperCase().includes(upperFilter) ||
                        s.facts.some((f) => f.description.toUpperCase().includes(upperFilter));
                })));
    }

    public disconnect(collectionViewer: CollectionViewer): void {
        // Nothing to do
    }
}
