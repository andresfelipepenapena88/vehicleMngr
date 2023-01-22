import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap } from "rxjs";
import { DriversService } from "src/app/services/drivers/drivers.service";
import { DriverInfo } from "../../models/driver.model";
import * as fromDriversActions from './drivers.actions';

@Injectable()
export class DriversEffects {

    getDriver$ = createEffect(() => this.actions$.pipe(
        ofType(fromDriversActions.driversActionsType.GET_DRIVER_BY_VEHICLE),
        switchMap((payload: { vehicleRef: string }) => {
            if (!payload.vehicleRef) {
                return this.service.getEmptyDriver().pipe(
                    map((driver) => {
                        return fromDriversActions.getDriverFailed();
                    })
                );
            }
            return this.service.getDriverByLicense(payload).pipe(
                map((driver: DriverInfo | null) => {
                    return fromDriversActions.getDriverSuccess({ driver: driver });
                })
            )
        })
    ));

    getAllDrivers$ = createEffect(() => this.actions$.pipe(
        ofType(fromDriversActions.driversActionsType.GET_DRIVERS),
        switchMap(() => this.service.getDrivers().pipe(
                map((allDrivers: DriverInfo[]) => {
                    return fromDriversActions.getAllDriversSuccess({ list: allDrivers });
                })
            )
        )
    ));

    addDriver$ = createEffect(() => this.actions$.pipe(
        ofType(fromDriversActions.driversActionsType.ADD_DRIVER),
        switchMap((payload: { newDriver: DriverInfo }) => this.service.addDriver(payload.newDriver).pipe(
                map((response: { success: boolean; msg: string }) => {
                    return fromDriversActions.addDriverSuccess(response);
                })
            )
        )
    ));

    constructor(
        private actions$: Actions,
        private service: DriversService
    ) {}
}