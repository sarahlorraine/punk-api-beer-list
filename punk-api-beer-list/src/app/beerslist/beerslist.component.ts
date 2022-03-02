import { Component, Input, OnInit } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  first,
  map,
  Observable,
  Subject,
  switchMap,
} from 'rxjs';
import { BeersService } from '../services/beers/beers.service';
import { PunkApiBeer } from '../services/beers/types';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-beerslist',
  templateUrl: './beerslist.component.html',
  styleUrls: ['./beerslist.component.scss'],
})
export class BeerslistComponent implements OnInit {
  @Input() searchTerm: string = '';
  beers$: Observable<PunkApiBeer[]> | undefined;
  title: string = 'Beers list';
  private pageNumber = 1;

  constructor(
    private beersService: BeersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  getBeers = (): void => {
    this.beers$ = this.beersService.getBeers(this.pageNumber, this.searchTerm);
  };

  ngOnInit(): void {
    // Allow params change to trigger state change in the component
    this.router.routeReuseStrategy.shouldReuseRoute = (route) => {
      return false;
    };
    this.searchTerm = this.route.snapshot.queryParams['search'] ?? '';
    this.beers$ = this.beersService.getBeers(this.pageNumber, this.searchTerm);
  }
}
