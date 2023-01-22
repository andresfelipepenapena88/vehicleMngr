import { createAction, props } from "@ngrx/store";
import { VehicleTypes } from "src/app/common/models/vehicle-types.model";

export enum paymentsActionsType {
    GET_VEHICLE_TYPES = '[VEHICLE TYPES] GET VEHICLE TYPES',
    GET_VEHICLE_TYPES_SUCCESS = '[VEHICLE TYPES] GET VEHICLE TYPES SUCCESS',
    GET_VEHICLE_TYPES_FAILED = '[VEHICLE TYPES] GET VEHICLE TYPES FAILED',
};

export const getVehicleTypes = createAction(
    paymentsActionsType.GET_VEHICLE_TYPES
);

export const getVehicleTypesSuccess = createAction(
    paymentsActionsType.GET_VEHICLE_TYPES_SUCCESS,
    props<{ types: VehicleTypes[] }>()
);

export const getVehicleTypesFailed = createAction(
    paymentsActionsType.GET_VEHICLE_TYPES_FAILED
);