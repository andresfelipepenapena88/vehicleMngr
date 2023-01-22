import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { VehicleByDriver } from 'src/app/common/models/vehicleByDriver.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private afs: AngularFirestore
  ) { }

  getVehicleByDriver(vehicleRef: string, driverRef: string): Observable<DocumentChangeAction<VehicleByDriver>[] | null> {
    if (!vehicleRef || vehicleRef == null || !driverRef || driverRef == null ) {
      return of(null);
    } 
    return this.afs.collection<VehicleByDriver>(
      'vehicle-by-driver',
      ref => ref.where('vehicle', '==', vehicleRef)
                  .where('driver', '==', driverRef)
                  .where('active', '==', true)
      ).snapshotChanges();
  }

}
