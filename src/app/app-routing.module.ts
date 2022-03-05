import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BeersListSceneComponent } from "./scenes/beerslistscene/beerslistscene.component";

const routes: Routes = [
  { path: "", redirectTo: "/beers", pathMatch: "full" },
  { path: "beers", component: BeersListSceneComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
