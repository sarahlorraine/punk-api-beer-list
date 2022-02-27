import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { PunkApiBeer } from './types';

@Injectable({ providedIn: 'root' })
export class BeersService {
  private punkApiUrl = 'https://api.punkapi.com/v2/beers/'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient // private messageService: MessageService
  ) {}

  /** GET beers from PunkApi */
  // getHeroes(): Observable<Hero[]> {
  //   return this.http.get<Hero[]>(this.heroesUrl).pipe(
  //     tap((_) => this.log('fetched heroes')),
  //     catchError(this.handleError<Hero[]>('getHeroes', []))
  //   );
  // }
  getBeers = (): Observable<PunkApiBeer[]> => {
    return this.http.get<PunkApiBeer[]>(this.punkApiUrl).pipe(
      tap((_) => this.log('fetched beers')),
      catchError(this.handleError<PunkApiBeer[]>('getBeers', []))
    );
    // return [
    //   {
    //     id: 266,
    //     name: 'Small Batch: Lemon Meringue Pie',
    //     tagline: 'Experimental Dessert Beer.',
    //     first_brewed: '2017',
    //     description:
    //       'Brewed to a concept voted on at Craft Beer Rising, this one-off beer is an experimental brew which emulates the flavour of lemon meringue pie.',
    //     image_url: 'null',
    //     abv: 6.5,
    //     ibu: 5,
    //     target_fg: 1015,
    //     target_og: 1066,
    //     ebc: 7,
    //     srm: 4,
    //     ph: 4,
    //     attenuation_level: 77,
    //     volume: { value: 20, unit: 'litres' },
    //     boil_volume: { value: 25, unit: 'litres' },
    //     method: {
    //       mash_temp: [{ temp: { value: 65, unit: 'celsius' }, duration: 90 }],
    //       fermentation: { temp: { value: 19, unit: 'celsius' } },
    //       twist: 'null',
    //     },
    //     ingredients: {
    //       malt: [
    //         {
    //           name: 'Maris Otter',
    //           amount: { value: 4.533, unit: 'kilograms' },
    //         },
    //         {
    //           name: 'Dextrin Malt',
    //           amount: { value: 0.567, unit: 'kilograms' },
    //         },
    //         {
    //           name: 'Flaked Oats',
    //           amount: { value: 0.567, unit: 'kilograms' },
    //         },
    //       ],
    //       hops: [
    //         {
    //           name: 'Amarillo',
    //           amount: { value: 30, unit: 'grams' },
    //           add: '0',
    //           attribute: 'Aroma',
    //         },
    //         {
    //           name: 'Sorachi Ace',
    //           amount: { value: 30, unit: 'grams' },
    //           add: '0',
    //           attribute: 'Aroma',
    //         },
    //         {
    //           name: 'Lemon Peel',
    //           amount: { value: 4, unit: 'grams' },
    //           add: 'Flame Out',
    //           attribute: 'Flavour',
    //         },
    //         {
    //           name: 'Coriander Seeds',
    //           amount: { value: 2, unit: 'grams' },
    //           add: 'Flame Out',
    //           attribute: 'Flavour',
    //         },
    //         {
    //           name: 'Lemon Concentrate',
    //           amount: { value: 100, unit: 'grams' },
    //           add: 'Flame Out',
    //           attribute: 'Flavour',
    //         },
    //       ],
    //       yeast: 'Wyeast 1056 - American Ale™',
    //     },
    //     food_pairing: ['Lemon Tart'],
    //     brewers_tips:
    //       'Dextrin Malt adds sugars to your wort that the yeast are unable to ferment. If you want a sweetness remaining in your beer, add a little of this but not too much!!!',
    //     contributed_by: 'John Jenkman <johnjenkman>',
    //   },
    // ];
  };

  // /** GET hero by id. Return `undefined` when id not found */
  // getHeroNo404<Data>(id: number): Observable<Hero> {
  //   const url = `${this.heroesUrl}/?id=${id}`;
  //   return this.http.get<Hero[]>(url).pipe(
  //     map((heroes) => heroes[0]), // returns a {0|1} element array
  //     tap((h) => {
  //       const outcome = h ? 'fetched' : 'did not find';
  //       this.log(`${outcome} hero id=${id}`);
  //     }),
  //     catchError(this.handleError<Hero>(`getHero id=${id}`))
  //   );
  // }

  // /** GET hero by id. Will 404 if id not found */
  // getHero(id: number): Observable<Hero> {
  //   const url = `${this.heroesUrl}/${id}`;
  //   return this.http.get<Hero>(url).pipe(
  //     tap((_) => this.log(`fetched hero id=${id}`)),
  //     catchError(this.handleError<Hero>(`getHero id=${id}`))
  //   );
  // }

  // /* GET heroes whose name contains search term */
  // searchHeroes(term: string): Observable<Hero[]> {
  //   if (!term.trim()) {
  //     // if not search term, return empty hero array.
  //     return of([]);
  //   }
  //   return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
  //     tap((x) =>
  //       x.length
  //         ? this.log(`found heroes matching "${term}"`)
  //         : this.log(`no heroes matching "${term}"`)
  //     ),
  //     catchError(this.handleError<Hero[]>('searchHeroes', []))
  //   );
  // }

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
