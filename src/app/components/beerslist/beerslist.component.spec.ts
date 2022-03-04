import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerslistComponent } from './beerslist.component';

describe('BeerslistComponent', () => {
  let component: BeerslistComponent;
  let fixture: ComponentFixture<BeerslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeerslistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
