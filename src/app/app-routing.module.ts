import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BeersListSceneComponent } from "./beerslistscene/beerslistscene.component";

const routes: Routes = [
  { path: "", redirectTo: "/beers", pathMatch: "full" },
  { path: "beers", component: BeersListSceneComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
