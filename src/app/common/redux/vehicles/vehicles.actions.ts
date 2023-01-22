import { createAction, props } from "@ngrx/store";
import { Vehicle } from "src/app/common/models/vehicle.model";

export enum vehiclesActionsType {
    GET_VEHICLE_LIST = '[VEHICLES] GET VEHICLE LIST',
    GET_VEHICLE_LIST_SUCCESS = '[VEHICLES] GET VEHICLE LIST SUCCESS',
    GET_VEHICLE_LIST_FAILED = '[VEHICLES] GET VEHICLE LIST FAILED'
};

export const getVehicleList = createAction(
    vehiclesActionsType.GET_VEHICLE_LIST
);

export const getVehicleListSuccess = createAction(
    vehiclesActionsType.GET_VEHICLE_LIST_SUCCESS,
    props<{ list: Vehicle[] }>()
);

export const getVehicleListFailed = createAction(
    vehiclesActionsType.GET_VEHICLE_LIST_FAILED
);