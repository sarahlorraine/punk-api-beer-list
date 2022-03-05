import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-beerslistscene",
  templateUrl: "./beerslistscene.component.html",
  styleUrls: ["./beerslistscene.component.scss"],
})
export class BeersListSceneComponent implements OnInit {
  constructor() {}
  title: string = "Brewdog Beer Catalogue";

  ngOnInit(): void {}
}
