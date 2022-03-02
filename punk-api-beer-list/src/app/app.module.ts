import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BeerslistComponent } from './beerslist/beerslist.component';
import { BeersSearchComponent } from './beerssearch/beerssearch.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [AppComponent, BeerslistComponent, BeersSearchComponent, PaginationComponent],
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
