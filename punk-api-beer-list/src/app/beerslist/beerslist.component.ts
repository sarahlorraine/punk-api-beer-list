import { Component, Input, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, Observable } from 'rxjs';
import { BeersService } from '../services/beers/beers.service';
import { Pagination, PunkApiBeer } from '../services/beers/types';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-beerslist',
  templateUrl: './beerslist.component.html',
  styleUrls: ['./beerslist.component.scss'],
})
export class BeerslistComponent implements OnInit {
  private searchTerm: string = '';
  private currentPage: number = 1;
  private maxPerPage: number = 20;

  beers$: Observable<PunkApiBeer[]> | undefined;
  title: string = 'Beers list';
  constructor(
    private beersService: BeersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  getBeers = (): void => {
    console.log('event');
    this.beers$ = this.beersService.getBeers(
      this.currentPage,
      this.maxPerPage,
      this.searchTerm
    );
  };
  ngOnInit(): void {
    // Allow a route params change to trigger state change in the component
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.searchTerm = this.route.snapshot.queryParams['beer_name'] ?? '';
    this.currentPage =
      this.route.snapshot.queryParams['page'] ?? this.currentPage;
    this.maxPerPage =
      this.route.snapshot.queryParams['per_page'] ?? this.maxPerPage;
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        distinctUntilChanged(),
        debounceTime(1000)
      )
      .subscribe(() => this.getBeers());

    if (!this.beers$) {
      this.beers$ = this.beersService.getBeers(
        this.currentPage,
        this.maxPerPage,
        this.searchTerm
      );
    }
  }
}
