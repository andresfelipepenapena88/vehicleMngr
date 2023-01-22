import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromDriversReducer from '../../common/redux/drivers/drivers.reducer';
import * as fromDriversActions from '../../common/redux/drivers/drivers.actions';
import * as fromDriversSelector from '../../common/redux/drivers/drivers.selectors';
import { DriverInfo } from 'src/app/common/models/driver.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import alert from 'sweetalert2';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit {

  drivers: DriverInfo[] = [];
  driverForm = new FormGroup({
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required)
  });
  addDriverLoading: boolean = false;

  constructor(
    private store: Store<fromDriversReducer.driversState>
  ) {
    this.getDrivers();
  }

  ngOnInit(): void {
  }

  getDrivers() {
    this.store.dispatch(fromDriversActions.getAllDrivers());
    this.store.select(fromDriversSelector.selectAllDrivers).subscribe(response => {
      if (response.loaded) {
        this.drivers = response.list;
      }
    })
  }

  addNewDriver() {
    if (this.driverForm.invalid ||
      this.driverForm.controls.id.value == null ||
      this.driverForm.controls.name.value == null ||
      this.driverForm.controls.phone.value == null ||
      this.driverForm.controls.address.value == null ||
      this.driverForm.controls.email.value == null) {
        alert.fire({
          icon: 'error',
          title: '¡ ERROR !',
          text: 'Revisa los campos diligenciados.',
          showConfirmButton: false,
          showCancelButton: false,
          timer: 1500
        });
      } else {
        const newDriver: DriverInfo = {
          id: this.driverForm.controls.id.value,
          name: this.driverForm.controls.name.value,
          phone: this.driverForm.controls.phone.value,
          address: this.driverForm.controls.address.value,
          email: this.driverForm.controls.email.value
        };

        this.store.dispatch(fromDriversActions.addDriver({ newDriver }));
        this.store.select(fromDriversSelector.selectAddDriver).subscribe(response => {
          this.addDriverLoading = response.loading;
          if (response.loaded) {
            alert.fire({
              icon: 'success',
              title: response.msg,
              text: '¡Increible!',
              timer: 1500,
              showConfirmButton: false
            }).then(response => {
              this.driverForm.reset();
            });
          }
        })

      }
  }

  cleanDriverForm() {
    this.driverForm.reset();
  }

}
