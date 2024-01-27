import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from './components/customer/customer.component';
import { PersonComponent } from './components/person/person.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: 'customer', component: CustomerComponent },
  { path: 'person', component: PersonComponent },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
