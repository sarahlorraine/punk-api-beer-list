import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeersSearchComponent } from './components/beerssearch/beerssearch.component';

const routes: Routes = [
  { path: '', redirectTo: '/beers', pathMatch: 'full' },
  { path: 'beers', component: BeersSearchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
