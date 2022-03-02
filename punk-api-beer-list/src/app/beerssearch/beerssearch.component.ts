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
import { PunkApiBeer } from '../services/beers/types';

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
    // If we pass in a value then we want to search for a clicked item
    // from the suggested search list, otherwise use the search input value
    this.updateParams(value ?? this.searchValue);
    this.beersService.setNewSearches(value ?? this.searchValue);
  };

  updateParams = (term: string) => {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { search: term },
      queryParamsHandling: 'merge',
    });
  };

  ngOnInit(): void {
    console.log('matched:' + this.matchedSearches);
    this.searchTerms
      .pipe(
        // wait 300ms after each keystroke before considering the term
        debounceTime(300),
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
