import { ComponentFixture, TestBed } from "@angular/core/testing";

import { BeersListSceneComponent } from "./beerslistscene.component";

describe("BeerslistsceneComponent", () => {
  let component: BeersListSceneComponent;
  let fixture: ComponentFixture<BeersListSceneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BeersListSceneComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeersListSceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
