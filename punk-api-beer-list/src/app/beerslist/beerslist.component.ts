import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BeersService } from '../services/beers/beers.service';
import { Pagination, PunkApiBeer } from '../services/beers/types';
import { ActivatedRoute, Router } from '@angular/router';

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

  ngOnInit(): void {
    // Allow params change to trigger state change in the component
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.searchTerm = this.route.snapshot.queryParams['beer_name'] ?? '';
    this.currentPage =
      this.route.snapshot.queryParams['page'] ?? this.currentPage;
    this.maxPerPage =
      this.route.snapshot.queryParams['per_page'] ?? this.maxPerPage;
    this.beers$ = this.beersService.getBeers(
      this.currentPage,
      this.maxPerPage,
      this.searchTerm
    );
  }
}
