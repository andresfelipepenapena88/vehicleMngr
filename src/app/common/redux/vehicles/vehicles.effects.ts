import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import * as fromVehiclesActions from './vehicles.actions';
import { Vehicle } from 'src/app/common/models/vehicle.model';
import { VehiclesService } from 'src/app/services/vehicles/vehicles.service';

@Injectable()
export class VehiclesEffects {
    getVehicleList$ = createEffect(() => this.actions$.pipe(
        ofType(fromVehiclesActions.vehiclesActionsType.GET_VEHICLE_LIST),
        switchMap(() => this.vehiclesService.getVehicleList().pipe(
            map((vehicles: Vehicle[]) => {
                return fromVehiclesActions.getVehicleListSuccess({ list: vehicles });
            })
        ))
    ));

    constructor(
        private actions$: Actions,
        private vehiclesService: VehiclesService
    ) {}
}