import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map} from 'rxjs/operators';
import { PaymentsService } from 'src/app/services/payments/payments.service';
import { Payment } from '../../models/payment.model';
import * as fromPaymentsActions from './payments.actions'

@Injectable()
export class PaymentsEffects {
    getPaymentsByDriverAndVehicle$ = createEffect(() => this.actions$.pipe(
        ofType(fromPaymentsActions.paymentActionsType.GET_PAYMENTS),
        switchMap((payload: { vehicleRef: string, driverRef: string }) => this.paymentsService.getPayments(
            payload.vehicleRef,
            payload.driverRef
        ).pipe(
            map((payments: Payment[] | null) => {
                if (!payments) {
                    return fromPaymentsActions.getPaymentsSuccess({ list: [] });    
                }
                return fromPaymentsActions.getPaymentsSuccess({ list: payments ? payments : [] });
            })
        ))
    ));

    payDebt$ = createEffect(() => this.actions$.pipe(
        ofType(fromPaymentsActions.paymentActionsType.PAY_DEBT),
        switchMap((payload: { payment: Payment }) => this.paymentsService.payDebts(payload.payment).pipe(
            map((response) => {
                return fromPaymentsActions.payDebtSuccess(response);
            })
        ))
    ));

    constructor(
        private actions$: Actions,
        private paymentsService: PaymentsService
    ) {}
}