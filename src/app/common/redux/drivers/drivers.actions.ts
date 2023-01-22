import { createAction, props } from "@ngrx/store";
import { DriverInfo } from "../../models/driver.model";

export enum driversActionsType {
    GET_DRIVER_BY_VEHICLE = '[DRIVERS] GET DRIVER BY VEHICLE',
    GET_DRIVER_BY_VEHICLE_SUCCESS = '[DRIVERS] GET DRIVER BY VEHICLE SUCCESS',
    GET_DRIVER_BY_VEHICLE_FAILED = '[DRIVERS] GET DRIVER BY VEHICLE FAILED',
    GET_DRIVERS = '[DRIVERS] GET ALL DRIVERS',
    GET_DRIVERS_SUCCESS = '[DRIVERS] GET ALL DRIVERS SUCCESS',
    ADD_DRIVER = '[DRIVERS] ADD_DRIVER',
    ADD_DRIVER_SUCCESS = '[DRIVERS] ADD_DRIVER SUCCESS',
};

export const getDriverByVehicle = createAction(
    driversActionsType.GET_DRIVER_BY_VEHICLE,
    props<{ vehicleRef: string | null }>()
);

export const getDriverSuccess = createAction(
    driversActionsType.GET_DRIVER_BY_VEHICLE_SUCCESS,
    props<{ driver: DriverInfo | null }>()
);

export const getDriverFailed = createAction(
    driversActionsType.GET_DRIVER_BY_VEHICLE_FAILED
);

export const getAllDrivers = createAction(
    driversActionsType.GET_DRIVERS
);

export const getAllDriversSuccess = createAction(
    driversActionsType.GET_DRIVERS_SUCCESS,
    props<{ list: DriverInfo[] }>()
);

export const addDriver = createAction(
    driversActionsType.ADD_DRIVER,
    props<{ newDriver: DriverInfo }>()
);

export const addDriverSuccess = createAction(
    driversActionsType.ADD_DRIVER_SUCCESS,
    props<{ success: boolean, msg: string }>()
);