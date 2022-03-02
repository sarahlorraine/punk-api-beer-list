import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeersSearchComponent } from './beerssearch.component';

describe('BeerssearchComponent', () => {
  let component: BeersSearchComponent;
  let fixture: ComponentFixture<BeersSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BeersSearchComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeersSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
