import { NgModule, LOCALE_ID } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { PaymentsComponent } from './payments.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { VehiclesService } from 'src/app/services/vehicles/vehicles.service';
import { vehicleTypesReducer, vehicleTypesReducerKey } from '../../common/redux/vehicle-types/vehicle-types.reducer';
import { vehicleReducer, vehicleReducerKey } from 'src/app/common/redux/vehicles/vehicles.reducer';
import { VehiclesEffects } from 'src/app/common/redux/vehicles/vehicles.effects';
import { VehicleTypesEffects } from 'src/app/common/redux/vehicle-types/vehicle-types.effects';
import { VehicleTypesService } from 'src/app/services/vehicle-types/vehicle-types.service';
import { driversReducer, driversReducerKey } from 'src/app/common/redux/drivers/drivers.reducer';
import { DriversService } from 'src/app/services/drivers/drivers.service';
import { DriversEffects } from 'src/app/common/redux/drivers/drivers.effects';
import { paymentsReducer, paymentsReducerKey } from 'src/app/common/redux/payments/payments.reducer';
import { PaymentsEffects } from 'src/app/common/redux/payments/payments.effects';
import { PaymentsService } from 'src/app/services/payments/payments.service';
import { CopFormatPipe } from 'src/app/common/pipes/cop-format.pipe';
import * as localeCO from '@angular/common/locales/es-CO';
import { deductionsReducer, deductionsReducerKey } from 'src/app/common/redux/deductions/deductions.reducer';
import { DeductionsEffects } from 'src/app/common/redux/deductions/deductions.effects';
import { DeductionsService } from 'src/app/services/deductions/deductions.service';
import { MaintenancesService } from 'src/app/services/maintenances/maintenances.service';
import { maintenancesReducer, maintenancesReducerKey } from 'src/app/common/redux/maintenances/maintenances.reducer';
import { MaintenancesEffects } from 'src/app/common/redux/maintenances/maintenances.effects';
registerLocaleData(localeCO.default);

@NgModule({
  declarations: [
    PaymentsComponent, CopFormatPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature(vehicleReducerKey, vehicleReducer),
    StoreModule.forFeature(vehicleTypesReducerKey, vehicleTypesReducer),
    StoreModule.forFeature(driversReducerKey, driversReducer),
    StoreModule.forFeature(paymentsReducerKey, paymentsReducer),
    StoreModule.forFeature(deductionsReducerKey, deductionsReducer),
    StoreModule.forFeature(deductionsReducerKey, deductionsReducer),
    StoreModule.forFeature(maintenancesReducerKey, maintenancesReducer),
    EffectsModule.forFeature([VehiclesEffects, VehicleTypesEffects, DriversEffects, PaymentsEffects, DeductionsEffects, MaintenancesEffects])
  ],
  exports: [
    PaymentsComponent
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-CO' },
    VehiclesService, VehicleTypesService, DriversService, PaymentsService, DeductionsService, MaintenancesService, DatePipe, CopFormatPipe
  ]
})
export class PaymentsModule { }
