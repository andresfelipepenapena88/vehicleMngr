import { createReducer, on } from "@ngrx/store";
import { Payment } from "../../models/payment.model";
import * as PaymentsActions from './payments.actions';

export interface paymentsState {
    payments: {
        loaded: boolean;
        loading: boolean;
        failed: boolean;
        list: Payment[]
    };
    payDebt: {
        success: boolean;
        failed: boolean;
        msg: string;
    };
};

export const paymentsInitState: paymentsState = {
    payments: {
        loaded: false,
        loading: false,
        failed: false,
        list: []
    },
    payDebt: {
        success: false,
        failed: false,
        msg: ''
    }
};

export const paymentsReducer = createReducer(
    paymentsInitState,
    on(
        PaymentsActions.getPayments,
        paymentsState => ({
            ...paymentsState,
            payments: {
                loaded: false,
                loading: true,
                failed: false,
                list: []
            }
        })
    ),
    on(
        PaymentsActions.getPaymentsSuccess,
        (paymentsState, payload) => ({
            ...paymentsState,
            payments: {
                loaded: true,
                loading: false,
                failed: false,
                list: payload.list
            }
        })
    ),
    on(
        PaymentsActions.payDebtSuccess,
        (paymentState, payload) => ({
            ...paymentState,
            payDebt: {
                success: payload.success,
                failed: !payload.success,
                msg: payload.msg
            }
        })
    )
);

export const paymentsReducerKey = 'payments';