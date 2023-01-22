import { createAction, props } from "@ngrx/store";
import { Payment } from "../../models/payment.model";

export enum paymentActionsType {
    GET_PAYMENTS = '[PAYMENTS] GET PAYMENTS',
    GET_PAYMENTS_SUCCESS = '[PAYMENTS] GET PAYMENTS SUCCESS',
    GET_PAYMENTS_FAILED = '[PAYMENTS] GET PAYMENTS FAILED',
    PAY_DEBT = '[PAYMENTS] PAY DEBT',
    PAY_DEBT_SUCCESS = '[PAYMENTS] PAY DEBT SUCCESS'
};

export const getPayments = createAction(
    paymentActionsType.GET_PAYMENTS,
    props<{ vehicleRef: string | null, driverRef: string | null }>()
);

export const getPaymentsSuccess = createAction(
    paymentActionsType.GET_PAYMENTS_SUCCESS,
    props<{ list: Payment[] }>()
);

export const payDebt = createAction(
    paymentActionsType.PAY_DEBT,
    props<{ payment: Payment }>()
);

export const payDebtSuccess = createAction(
    paymentActionsType.PAY_DEBT_SUCCESS,
    props<{ success: boolean; msg: string }>()
);



