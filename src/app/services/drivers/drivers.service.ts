import { Injectable } from '@angular/core';
import { Action, AngularFirestore, DocumentSnapshot } from '@angular/fire/compat/firestore';
import { from, map, Observable, of, switchMap } from 'rxjs';
import { DriverInfo } from 'src/app/common/models/driver.model';
import { VehicleByDriver } from 'src/app/common/models/vehicleByDriver.model';

@Injectable({
  providedIn: 'root'
})
export class DriversService {

  constructor(private afs: AngularFirestore) { }

  getDrivers(): Observable<DriverInfo[]> {
    return this.afs.collection<DriverInfo>('drivers').valueChanges();
  }

  getDriverByLicense(ref: { vehicleRef: string}): Observable<DriverInfo | null> {
    console.log('vehicle ref', ref.vehicleRef);
    return this.afs.collection<VehicleByDriver>(
      'vehicle-by-driver',
      query => query.where('vehicle', '==', ref.vehicleRef)
    ).valueChanges().pipe(switchMap((vxd: VehicleByDriver[]) => {
      const driverPath = vxd.find(element => element.active);
      if (!driverPath?.driver) {
        return this.getEmptyDriver();
      }
      console.log(driverPath?.driver);
      return this.afs.doc<DriverInfo>('drivers/' + driverPath?.driver).snapshotChanges().pipe(map(response => {
        console.log(response.payload.data());
        const asDriver = response.payload.data() as DriverInfo;
        if (!asDriver) {
          return null;
        }
        return {
          ...asDriver,
          docRef: response.payload.id
        };
      }));
    }));
  }

  getEmptyDriver(): Observable<DriverInfo | null> {
    return of(null);
  }

  addDriver(newDriver: DriverInfo): Observable<{ success: boolean; msg: string }> {
    return from(this.afs.collection('drivers').add(newDriver)).pipe(map(response => {
      return { success: true, msg: '¡ Conductor guardado exitosamente !' };
    }));
  }

}
