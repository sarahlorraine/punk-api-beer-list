import { Component, OnInit } from '@angular/core';
import { BeersService } from '../services/beers/beers.service';
import { PunkApiBeer } from '../services/beers/types';

@Component({
  selector: 'app-beerslist',
  templateUrl: './beerslist.component.html',
  styleUrls: ['./beerslist.component.scss'],
})
export class BeerslistComponent implements OnInit {
  beers: PunkApiBeer[] | undefined;
  title: string = 'Beers list';

  constructor(private beersService: BeersService) {}

  getBeers(): void {
    this.beersService.getBeers().subscribe((beers) => (this.beers = beers));
  }
  ngOnInit(): void {
    this.getBeers();
  }
}
