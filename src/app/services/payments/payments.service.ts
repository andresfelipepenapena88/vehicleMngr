import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from 'firebase/firestore';
import { map, switchMap, of, Observable, from } from 'rxjs';
import { Deduction } from 'src/app/common/models/deduction.model';
import { Payment } from 'src/app/common/models/payment.model';
import { VehicleByDriver } from 'src/app/common/models/vehicleByDriver.model';
import { CommonService } from '../common/common.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(
    private afs: AngularFirestore,
    private datePipe: DatePipe,
    private commonService: CommonService
    )
  { }

  getPayments(vehicleRef: string, driverRef: string): Observable<Payment[] | null> {
    return this.commonService.getVehicleByDriver(vehicleRef, driverRef).pipe(switchMap(snapshot => {
        if (snapshot == null || snapshot[0] == null) {
          return of(null);
        } 
        return this.afs.collection<Payment>(
          'payments',
          ref => ref.where('vehicleByDriver', '==', snapshot[0].payload.doc.id).orderBy('startDate', 'asc')
          ).snapshotChanges().pipe(map((response: any[]) => {
            let lastPaymenttoCompareDates = null;
            if (response == null || response == undefined || response.length <= 0) {
              lastPaymenttoCompareDates = { endDate: snapshot[0].payload.doc.data().date };
            } else {
              lastPaymenttoCompareDates = response[response.length -1].payload.doc.data();
              if (lastPaymenttoCompareDates.endDate == null || lastPaymenttoCompareDates.endDate == undefined) {
                lastPaymenttoCompareDates = { endDate: snapshot[0].payload.doc.data().date };
              }
            }
            
            this.compareLastDateWithToday(lastPaymenttoCompareDates.endDate, snapshot[0].payload.doc.id);
            const payments = response.map(paymentSnapshot => {
              const payment = paymentSnapshot.payload.doc.data();
              const startDate: Timestamp = payment.startDate;
              const endDate: Timestamp = payment.endDate;
              let totalDeductions: number = 0;
              if (payment.deductions != undefined && payment.deductions.length > 0) {
                payment.deductions.forEach((deduction: Deduction) => {
                  totalDeductions += deduction.cost;
                });
              }
              return {
                ...payment,
                id: paymentSnapshot.payload.doc.id,
                startDate: this.datePipe.transform(startDate.toDate(), 'dd / MMM / YYYY'),
                endDate: this.datePipe.transform(endDate.toDate(), 'dd / MMM / YYYY'),
                totalDeductions
              }
            });
            return payments;
          }));
      }));
  }

  private compareLastDateWithToday(endDate: Timestamp, vehicleByDriverRef: string) {
    const today = Timestamp.now();
    const day = 1000*60*60*24;
    if (today <= endDate) {
      return;
    }
    const diff = (today.toMillis() - endDate.toMillis())/day;
    if (diff > 1) {
      const newStartDate = Timestamp.fromMillis(endDate.toMillis()+day);
      const newEndDate = Timestamp.fromMillis(endDate.toMillis()+day*7);
      const newPayment = {
        startDate: newStartDate,
        endDate: newEndDate,
        status: false,
        vehicleByDriver: vehicleByDriverRef
      };
      this.generatePayments(newPayment);
    }
  }

  private generatePayments(newPayment: any) {
    this.afs.collection('payments').add(newPayment);
  }

  public payDebts(payment: Payment): Observable<{ success: boolean; msg: string; }> {
    let dates = {};
    let startDates = false;
    if (payment.endDate.startsWith('0')) {
      startDates = true;
      dates = { ...dates, endDate: Timestamp.fromDate(new Date(payment.endDate.slice(1))) };
    }

    if (payment.startDate.startsWith('0')) {
      startDates = true;
      dates = { ...dates, startDate: Timestamp.fromDate(new Date(payment.startDate.slice(1))) };
    }

    const newPayment = !startDates ? {
      ...payment,
      startDate: Timestamp.fromDate(new Date(payment.startDate)),
      endDate: Timestamp.fromDate(new Date(payment.endDate)),
      status: true
    } : {
      ...payment,
      ...dates,
      status: true
    } 

    return of(this.afs.doc('payments/'+payment.id).update(newPayment)).pipe(
      map(response => {
        return { success: true, msg: 'Correcto' };
      })
    );
  }
}
