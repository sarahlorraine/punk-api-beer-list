import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  Subject,
} from 'rxjs';
import { BeersService } from '../services/beers/beers.service';
import { PunkApiBeer, PunkApiQueryParams } from '../services/beers/types';

@Component({
  selector: 'app-beerssearch',
  templateUrl: './beerssearch.component.html',
  styleUrls: ['./beerssearch.component.scss'],
})
export class BeersSearchComponent implements OnInit {
  beers$: Observable<PunkApiBeer[]> | undefined;
  title: string = 'Beers list';
  private searchTerms = new Subject<string>();
  private searchValue: string = '';
  matchedSearches: string[] = [];

  constructor(
    private beersService: BeersService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  // Used to update the search terms on input change
  setSearch = (value: string) => this.searchTerms.next(value);

  search = (value?: string): void => {
    var perPage: string | null =
      this.activatedRoute.snapshot.queryParams['per_page'];
    // If we pass in a value then we want to search for a clicked item
    // from the suggested search list, otherwise use the search input value
    this.updateParams(value ?? this.searchValue, '1', perPage ?? '20');
    this.beersService.setNewSearches(value ?? this.searchValue);
  };

  updateParams = (term: string, page: string, perPage: string) => {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        page: page,
        per_page: perPage,
        beer_name: term,
      } as PunkApiQueryParams,
      queryParamsHandling: 'merge',
    });
  };

  ngOnInit(): void {
    console.log('matched:' + this.matchedSearches);
    this.searchTerms
      .pipe(
        // wait 100ms after each keystroke before considering the term
        debounceTime(100),
        // ignore new term if same as previous term
        distinctUntilChanged(),
        map((term: string) => {
          this.searchValue = term;
          return this.beersService.getPreviousSearches(term);
        })
      )
      .subscribe((result) => (this.matchedSearches = result));
  }
}
