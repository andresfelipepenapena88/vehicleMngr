import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map } from "rxjs";
import { MaintenancesService } from "src/app/services/maintenances/maintenances.service";
import { Maintenance } from "../../models/maintenance.model";
import * as fromMaintenancesActions from './maintenances.actions';

@Injectable()
export class MaintenancesEffects {

    getMaintenancesByDriverAndVehicle$ = createEffect(() => this.actions$.pipe(
        ofType(fromMaintenancesActions.maintenanceActionsType.GET_MAINTENANCES),
        switchMap((payload: { vehicleRef: string; driverRef: string }) => this.maintenancesService.getMaintenances(
            payload.vehicleRef,
            payload.driverRef
        ).pipe(
            map((maintenances: Maintenance[] | null) => {
                if (maintenances == null) {
                    maintenances = [];
                }
                return fromMaintenancesActions.getMaintenancesSuccess({ list: maintenances });
            })
        ))
    ));

    addMaintenance$ = createEffect(() => this.actions$.pipe(
        ofType(fromMaintenancesActions.maintenanceActionsType.ADD_MAINTENANCE),
        switchMap((payload: { vehicleRef: string; driverRef: string, maintenance: Maintenance }) => this.maintenancesService.addMaintenance(
            payload.vehicleRef,
            payload.driverRef,
            payload.maintenance
        ).pipe(
            map((response: { success: boolean; msg: string } | null) => {
                if (response == null) {
                    response = { success: false, msg: 'error al guardar el registro de mantenimiento' };
                }
                return fromMaintenancesActions.addMaintenanceSuccess(response);
            })
        ))
    ));

    removeMaintenance$ = createEffect(() => this.actions$.pipe(
        ofType(fromMaintenancesActions.maintenanceActionsType.REMOVE_MAINTENANCE),
        switchMap((payload: { id: string }) => this.maintenancesService.removeMaintenance(payload.id).pipe(
            map((response: { success: boolean; msg: string } | null) => {
                if (response == null) {
                    response = { success: false, msg: 'error al guardar el registro de mantenimiento' };
                }
                return fromMaintenancesActions.removeMaintenanceSuccess(response);
            })
        ))
    ));

    constructor(
        private actions$: Actions,
        private maintenancesService: MaintenancesService
    ) {}
}