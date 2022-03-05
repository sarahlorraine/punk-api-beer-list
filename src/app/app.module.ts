import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BeerslistComponent } from "./components/beerslist/beerslist.component";
import { BeersSearchComponent } from "./components/beerssearch/beerssearch.component";
import { PaginationComponent } from "./components/pagination/pagination.component";
import { PageheaderComponent } from "./components/pageheader/pageheader.component";
import { LoadingComponent } from "./components/loading/loading.component";
import { BeersListSceneComponent } from "./beerslistscene/beerslistscene.component";

@NgModule({
  declarations: [
    AppComponent,
    BeerslistComponent,
    BeersSearchComponent,
    PaginationComponent,
    PageheaderComponent,
    LoadingComponent,
    BeersListSceneComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
