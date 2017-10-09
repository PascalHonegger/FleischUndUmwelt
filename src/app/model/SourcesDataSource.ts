import { ISource } from './ISource';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class SourcesDataSource extends DataSource<ISource> {
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

    constructor(private sources: ISource[]) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<ISource[]> {
        return Observable
            .merge(this.filterChanged)
            .map((filterString) =>
                this.sources.filter((s) => {
                    if (!filterString) {
                        return true;
                    }
                    const upperFilter = filterString.toUpperCase();
                    return s.title.toUpperCase().includes(upperFilter) ||
                        s.description.toUpperCase().includes(upperFilter) ||
                        s.facts.some((f) => f.description.toUpperCase().includes(upperFilter));
                }));
    }

    public disconnect(collectionViewer: CollectionViewer): void {
        // Nothing to do
    }
}
