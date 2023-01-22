import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriversComponent } from './pages/drivers/drivers.component';
import { PaymentsComponent } from './pages/payments/payments.component';
import { VehiclesComponent } from './pages/vehicles/vehicles.component';

const routes: Routes = [
  { path: 'payments', component: PaymentsComponent },
  { path: 'vehicles', component: VehiclesComponent },
  { path: 'drivers', component: DriversComponent },
  { path: '', pathMatch: 'full', redirectTo: '/payments' },
  { path: '**', pathMatch: 'full', redirectTo: '/payments' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
