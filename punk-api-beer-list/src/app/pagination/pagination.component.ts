import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pagination, PunkApiQueryParams } from '../services/beers/types';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() totalResults: number = 0;
  pagination: Pagination = {
    currentPage: 1,
    prev: false,
    next: false,
    totalResults: 0,
  };
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  goNext = () => {
    var nextPage: number = this.getCurrentPage();

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        page: (++nextPage).toString(),
      } as PunkApiQueryParams,
      queryParamsHandling: 'merge',
    });
  };

  goPrev = () => {
    var currentPage: number = this.getCurrentPage();
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        page: (currentPage > 1 ? --currentPage : 1).toString(),
      } as PunkApiQueryParams,
      queryParamsHandling: 'merge',
    });
  };

  getCurrentPage = (): number => {
    var currentPage = this.activatedRoute.snapshot.queryParams['page'];
    return isNaN(Number(currentPage))
      ? this.pagination.currentPage
      : currentPage;
  };

  setPagination = (currentPage: number, beersPerPage: number): void => {
    // Unsure of the best way to determine if there are more results than what is shown. We will only ever receive
    // the number of items that the route param "per_page" defines. This may result in a case where the total reuslts available
    // and a max results allowed to be shown are the same which means that the next button will show incorrectly.
    this.pagination.next = this.totalResults === beersPerPage;
    this.pagination.totalResults = this.totalResults;
    this.pagination.prev = currentPage > 1;
  };

  ngOnInit(): void {
    var currentPage = this.getCurrentPage();
    var maxPerPage = this.activatedRoute.snapshot.queryParams['per_page'];
    this.setPagination(
      isNaN(Number(currentPage))
        ? this.pagination.currentPage
        : Number(currentPage),
      isNaN(Number(currentPage)) ? 20 : Number(maxPerPage) // Default maxPerPage is 20
    );
  }
}
