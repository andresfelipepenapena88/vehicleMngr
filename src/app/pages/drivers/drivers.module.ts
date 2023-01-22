import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriversComponent } from './drivers.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ DriversComponent ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class DriversModule { }
