import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, of, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { PunkApiBeer } from "./types";

@Injectable({ providedIn: "root" })
export class BeersService {
  // BaseUrl to PunkApi
  private punkApiUrl = "https://api.punkapi.com/v2/beers";

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  handleRateLimit = (remaining: string | null) => {
    localStorage.setItem(
      "PunkApi_RateLimitRemaining",
      remaining?.toString() ?? ""
    );
    // TODO: This is not really handled right now and just throws an error.
    // Ideally we would either show a message to the user or create some kind of retry system
    if (Number(remaining) == 0) {
      throw throwError(() => new Error("Rate limit reached"));
    }
  };

  getRateLimit = (): number => {
    var remaining = localStorage.getItem("PunkApi_RateLimitRemaining");
    // If rate limit not stored, assume 1
    return isNaN(Number(remaining)) ? 1 : Number(remaining);
  };

  constructor(private http: HttpClient) {}

  getPreviousSearches = (term: string): string[] => {
    var savedSearchTerms = localStorage.getItem("PunkApi_SavedSearches");
    if (!savedSearchTerms?.length) return [];
    // Trim any trailing whitespace
    term.trim();
    var result: string[] =
      term != ""
        ? (JSON.parse(savedSearchTerms) as string[])?.filter((x) =>
            x.toLowerCase().includes(term.toLowerCase())
          )
        : []; // If the search term is an empty string we return 0 matches
    return result;
  };

  setNewSearches = (term: string): void => {
    var savedSearchTerms = localStorage.getItem("PunkApi_SavedSearches");
    var newSearchTerms: string[] = [];

    newSearchTerms = savedSearchTerms?.length
      ? (JSON.parse(savedSearchTerms) as string[])
      : [term];

    // If the max number of saved search terms (5) has been reached,
    // remove the first array item
    newSearchTerms.length >= 5 && newSearchTerms.splice(0, 1);
    newSearchTerms.push(term);

    localStorage.setItem(
      "PunkApi_SavedSearches",
      JSON.stringify(newSearchTerms)
    );
  };

  /* GET beers from PunkApi */
  getBeers = (
    page: number,
    perPage: number,
    searchTerm: string
  ): Observable<PunkApiBeer[]> => {
    return this.http
      .get<PunkApiBeer[]>(
        `${this.punkApiUrl}?page=${page}&per_page=${perPage}${
          searchTerm && `&beer_name=${searchTerm}`
        }`,
        { observe: "response" }
      )
      .pipe(
        map((response: any) => {
          this.handleRateLimit(response.headers.get("x-ratelimit-remaining"));
          return response.body;
        }),
        catchError(this.handleError<any>("getBeers", []))
      );
  };

  // Handle Http operation that failed.
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
