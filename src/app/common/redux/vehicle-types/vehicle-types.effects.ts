import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap } from "rxjs";
import { VehicleTypesService } from "src/app/services/vehicle-types/vehicle-types.service";
import { VehicleTypes } from "../../models/vehicle-types.model";
import * as fromVehicleTypesActions from './vehicle-types.actions';

@Injectable()
export class VehicleTypesEffects {
    getVehicleTypesList$ = createEffect(() => this.actins$.pipe(
        ofType(fromVehicleTypesActions.paymentsActionsType.GET_VEHICLE_TYPES),
        switchMap(() => this.service.getVehicleTypesList().pipe(
            map((response: VehicleTypes[]) => {
                return fromVehicleTypesActions.getVehicleTypesSuccess({ types: response });
            })
        ))
    ));

    constructor(
        private actins$: Actions,
        private service: VehicleTypesService
    ) {}

}