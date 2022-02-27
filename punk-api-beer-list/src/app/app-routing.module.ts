import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeerslistComponent } from './beerslist/beerslist.component';

const routes: Routes = [
  { path: '', redirectTo: '/beerslist', pathMatch: 'full' },
  { path: 'beerslist', component: BeerslistComponent },
  { path: 'details/:id', component: BeerslistComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}