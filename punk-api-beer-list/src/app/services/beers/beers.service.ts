import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, debounceTime, map, tap } from 'rxjs/operators';
import { PunkApiBeer } from './types';

@Injectable({ providedIn: 'root' })
export class BeersService {
  private punkApiUrl = 'https://api.punkapi.com/v2/beers'; // URL to PunkApi

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  handleRateLimit = (remaining: string | null) => {
    localStorage.setItem(
      'PunkApi_RateLimitRemaining',
      remaining?.toString() ?? ''
    );
  };

  getRateLimit = (): number => {
    var remaining = localStorage.getItem('PunkApi_RateLimitRemaining');
    // If rate limit not stored, assume 1
    return Number(remaining) ?? 1;
  };

  constructor(
    private http: HttpClient // private messageService: MessageService
  ) {}

  getPreviousSearches = (term: string): string[] => {
    var savedSearchTerms = localStorage.getItem('PunkApi_SavedSearches');
    if (!savedSearchTerms?.length) return [];
    // Trim any trailing whitespace
    term.trim();
    var result: string[] =
      term != ''
        ? (JSON.parse(savedSearchTerms) as string[])?.filter((x) =>
            x.toLowerCase().includes(term.toLowerCase())
          )
        : []; // If the search term is an empty string we return 0 matches
    return result;
  };

  setNewSearches = (term: string): void => {
    var savedSearchTerms = localStorage.getItem('PunkApi_SavedSearches');
    var newSearchTerms: string[] = [];

    newSearchTerms = savedSearchTerms?.length
      ? (JSON.parse(savedSearchTerms) as string[]) //savedSearchTerms?.concat(term + ',')
      : [term];

    // If the max number of saved search terms (5) has been reached,
    // remove the first array item
    newSearchTerms.length >= 5 && newSearchTerms.splice(0, 1);
    newSearchTerms.push(term);

    localStorage.setItem(
      'PunkApi_SavedSearches',
      JSON.stringify(newSearchTerms)
    );
  };

  /** GET beers from PunkApi */
  getBeers = (
    page: number,
    perPage: number,
    searchTerm: string
  ): Observable<PunkApiBeer[]> => {
    var remaining = this.getRateLimit();
    if (remaining > 0) {
    }
    return this.http
      .get<PunkApiBeer[]>(
        `${this.punkApiUrl}?page=${page}&per_page=${perPage}${
          searchTerm && `&beer_name=${searchTerm}`
        }`,
        { observe: 'response' }
      )
      .pipe(
        // By setting a delay of one second, the rate limit
        // per hour for PunkApi will never be met
        debounceTime(10000),
        map((response: any) => {
          this.handleRateLimit(response.headers.get('x-ratelimit-remaining'));
          return response.body;
        }),
        catchError(this.handleError<any>('getBeers', []))
      );
  };

  /** GET and filter beers from PunkApi */
  searchBeers(term: string): Observable<PunkApiBeer[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    // PunkApi requires spaces to be read as underscores
    term.replace(' ', '_');
    return this.http
      .get<any>(`${this.punkApiUrl}?beer_name=${term}`, {
        headers: new HttpHeaders(),
      })
      .pipe(
        tap((res) => {
          res.length
            ? this.log(`found beers matching "${term}"`)
            : this.log(`no beers matching "${term}"`);
          this.handleRateLimit(res.headers.get('x-ratelimit-remaining'));
        }),
        catchError(this.handleError<PunkApiBeer[]>('searchBeers', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    //this.messageService.add(`BeersService: ${message}`);
  }
}
