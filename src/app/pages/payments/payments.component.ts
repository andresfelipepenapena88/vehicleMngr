import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromVehicleActions from '../../common/redux/vehicles/vehicles.actions';
import * as fromVehicleSelectors from '../../common/redux/vehicles/vehicles.selectors';
import * as fromVehicleTypesActions from '../../common/redux/vehicle-types/vehicle-types.actions';
import * as fromVehicleTypesSelectors from '../../common/redux/vehicle-types/vehicle-types.selectors';
import * as fromDriversActions from '../../common/redux/drivers/drivers.actions';
import * as fromDriversSelectors from '../../common/redux/drivers/drivers.selectors';
import * as fromPaymentsActions from '../../common/redux/payments/payments.actions';
import * as fromPaymentsSelectors from '../../common/redux/payments/payments.selectors';
import * as fromDeductionsActions from '../../common/redux/deductions/deductions.actions';
import * as fromDeductionsSelectors from '../../common/redux/deductions/deductions.selectors';
import * as fromMaintenancesActions from '../../common/redux/maintenances/maintenances.actions';
import * as fromMaintenancesSelectors from '../../common/redux/maintenances/maintenances.selectors';
import alert from 'sweetalert2';
import { Vehicle } from 'src/app/common/models/vehicle.model';
import { VehicleTypes } from 'src/app/common/models/vehicle-types.model';
import { Subscription } from 'rxjs';
import { DriverInfo } from 'src/app/common/models/driver.model';
import { Payment } from 'src/app/common/models/payment.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Deduction } from 'src/app/common/models/deduction.model';
import { Maintenance } from 'src/app/common/models/maintenance.model';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit, OnDestroy {

  vehicleTypeLoading = false;
  vehicles: Vehicle[] = [];
  vehicleTypes: VehicleTypes[] = [];
  vehicleSelected: Vehicle | null | undefined = null; 
  vehicleSelectedIcon = '';
  vehicleDetailLoading = false;
  driver: DriverInfo | null | undefined = null;
  unsubscribe: Subscription[] = [];
  paymentsTableLoading = false;
  payments: Payment[] = [];
  totalPaid: number = 0;
  totalDeductions: number = 0;
  totalAllDeductions: number = 0;
  totalMaintenances: number = 0;
  total: number = 0;
  driverDebt: number = 0;
  selectedPayment: Payment | undefined | null = null;
  deductionForm = new FormGroup({
    cost: new FormControl('', Validators.required),
    observation: new FormControl('', Validators.required)
  });
  addDeductionLoading: boolean = false;
  removeDeductionLoading: boolean = false;
  editDriverInfo: boolean = false;
  maintenances: Maintenance[] = []; 
  maintenanceForm = new FormGroup({
    date: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    km: new FormControl('', Validators.required),
    cost: new FormControl('', Validators.required),
    observation: new FormControl(''),
  });
  addMaintenanceLoading: boolean = false;
  removeMaintenanceLoading: boolean = false;

  @ViewChild('closeDeductionModalButton') closeDeductionModalButton: any;
  @ViewChild('closeMaintenanceModalButton') closeMaintenanceModalButton: any;
  constructor(
    private store: Store
  ) {}

  ngOnInit(): void {
    this.getVehicleTypes();
    this.getVehicleList();
  }

  getVehicleTypes() {
    this.store.dispatch(fromVehicleTypesActions.getVehicleTypes());
    this.unsubscribe.push(
      this.store.select(fromVehicleTypesSelectors.selectVehicleTypes).subscribe(response => {
        this.vehicleTypes = response.types;
      })
    );
  }

  getVehicleList(): void {
    this.store.dispatch(fromVehicleActions.getVehicleList());
    this.unsubscribe.push(
      this.store.select(fromVehicleSelectors.selectVehicleList).subscribe(response => {
        this.vehicles = response.list;
        this.vehicleTypeLoading = response.loading;
      })
    );
  }

  changeSelected(event: any) {
    this.vehicleSelected = this.vehicles.find(vehicle => vehicle.license == event.value);
    const typeCode = this.vehicleTypes.find((type) => type.code == this.vehicleSelected?.type);
    this.vehicleSelectedIcon = typeCode ? typeCode?.icon : '';
    this.getDriverByVehicle();
  }

  getDriverByVehicle() {
    this.store.dispatch(fromDriversActions.getDriverByVehicle({ vehicleRef: this.vehicleSelected?.id ? this.vehicleSelected?.id : null }));
    this.unsubscribe.push(
      this.store.select(fromDriversSelectors.selectDriver).subscribe(response => {
          this.vehicleDetailLoading = response.loading;
          this.driver = response.info;
          if (this.driver && this.driver != null) {
            this.getPaymentsByDriverAndVehicle();
            this.getMaintenancesByDriverAndVehicle();
          } else {
            this.cleanPaymentInfo();
          }
      })
    );
  }

  getPaymentsByDriverAndVehicle() {
    this.store.dispatch(fromPaymentsActions.getPayments({ 
      vehicleRef: this.vehicleSelected?.id ? this.vehicleSelected?.id : null,
      driverRef: this.driver?.docRef ? this.driver?.docRef : null
    }));
    this.unsubscribe.push(
      this.store.select(fromPaymentsSelectors.selectPayments).subscribe(response => {
        this.paymentsTableLoading = response.loading;
        this.cleanPaymentInfo();
        this.payments = response.list;
        this.calculatePaymentTotals();
      })
    );
  }

  cleanPaymentInfo() {
    this.payments = [];
    this.totalPaid = 0;
    this.totalDeductions = 0;
    this.driverDebt = 0;
    this.totalAllDeductions = 0;
    this.totalMaintenances = 0;
    this.total = 0;
  }

  calculatePaymentTotals() {
    this.payments.forEach((payment: Payment) => {
      if (payment.status) {
        this.totalPaid += this.vehicleSelected ? this.vehicleSelected.liquidation : 0;
      } else {
        this.driverDebt += this.vehicleSelected ? this.vehicleSelected.liquidation : 0;
      }
      this.totalDeductions += payment.totalDeductions ? payment.totalDeductions : 0;
    });
    this.totalAllDeductions = this.totalDeductions;
    this.total = this.totalPaid - this.totalAllDeductions; 
  }

  payDebt(payment: Payment) {
    alert.fire({
      icon: 'question',
      title: 'Estas segur@?',
      text: 'Confirma si estás seguro de realizar el pago',
      showConfirmButton: true,
      confirmButtonText: 'Confirmar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar'
    }).then(alertResponse => {
      if (alertResponse.isConfirmed) {
        this.store.dispatch(fromPaymentsActions.payDebt({ payment }));
      }
    });
  }

  fireInvalidFormAlert() {
    alert.fire({
      icon: 'error',
      title: 'Error !!!',
      text: 'Revisa los campos diligenciados',
      showCancelButton: false,
      confirmButtonText: 'Aceptar'
    });
  }

  addNewDeduction() {
    if (this.deductionForm.invalid ||
      this.deductionForm.controls.cost.value == null ||
      this.deductionForm.controls.observation.value == null ||
      this.selectedPayment == null || this.selectedPayment == undefined) {
      this.fireInvalidFormAlert();
    } else {
      const deduction: Deduction = {
        cost: parseInt(this.deductionForm.controls.cost.value),
        observation: this.deductionForm.controls.observation.value
      };
      this.store.dispatch(fromDeductionsActions.addDeduction({ deduction, payment: this.selectedPayment }));
      this.unsubscribe.push(
        this.store.select(fromDeductionsSelectors.selectAddDeductions).subscribe(response => {
          this.addDeductionLoading = response.loading;
          if (response.loaded) {
            this.deductionForm.reset();
            this.closeDeductionModalButton.nativeElement.click();
            alert.fire({
              icon: 'success',
              title: response.msg,
              text: '¡Increible!',
              timer: 1000,
              showConfirmButton: false
            });
          }
          if (response.failed) {
            alert.fire({
              icon: 'error',
              title: 'Error al guardar la deduccion :C',
              timer: 500,
              showConfirmButton: false
            });
          }
        })
      );
    }
  }

  removeDeduction(index: number) {
    alert.fire({
      icon: 'question',
      title: 'Estas segur@?',
      text: 'Confirma si estás seguro de eliminar esta deducción',
      showConfirmButton: true,
      confirmButtonText: 'Confirmar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar'
    }).then(alertResponse => {
      if (alertResponse.isConfirmed) {
        if (this.selectedPayment != null && this.selectedPayment != undefined) {
          this.store.dispatch(fromDeductionsActions.removeDeduction({ index, payment: this.selectedPayment }));
          this.unsubscribe.push(
            this.store.select(fromDeductionsSelectors.selectRemoveDeductions).subscribe(response => {
              this.removeDeductionLoading = response.loading;
              if (response.loaded) {
                alert.fire({
                  icon: 'success',
                  title: response.msg,
                  text: '¡Increible!',
                  timer: 1000,
                  showConfirmButton: false
                });
                this.selectedPayment = this.payments.filter(payment => payment.id == this.selectedPayment?.id)[0];
              }
              if (response.failed) {
                alert.fire({
                  icon: 'error',
                  title: 'Error al guardar la deduccion :C',
                  timer: 500,
                  showConfirmButton: false
                });
              }
            })
          );
        }
      }
    });
  }

  editDriver() {
    this.editDriverInfo = !this.editDriverInfo
  }

  getMaintenancesByDriverAndVehicle() {
    this.store.dispatch(fromMaintenancesActions.getMaintenances({ 
      vehicleRef: this.vehicleSelected?.id ? this.vehicleSelected?.id : null,
      driverRef: this.driver?.docRef ? this.driver?.docRef : null
    }));

    this.unsubscribe.push(
      this.store.select(fromMaintenancesSelectors.selectMaintenances).subscribe(response => {
        this.maintenances = response.list ? response.list : [];
        this.totalMaintenances = 0;
        this.maintenances.forEach(maintenance => {
          this.totalMaintenances += maintenance.cost;
        });
        this.calculateTotals();
      })
    );
  }

  calculateTotals() {
    this.totalAllDeductions = this.totalDeductions + this.totalMaintenances;
    this.total = this.totalPaid - this.totalAllDeductions;
  }

  addNewMaintenance() {
    if (this.maintenanceForm.invalid ||
      this.maintenanceForm.controls.date.value == null ||
      this.maintenanceForm.controls.type.value == null ||
      this.maintenanceForm.controls.km.value == null ||
      this.maintenanceForm.controls.cost.value == null) {
        this.fireInvalidFormAlert();
    } else {
      let newMaintenance: Maintenance = {
        date: this.maintenanceForm.controls.date.value,
        type: this.maintenanceForm.controls.type.value,
        km: parseInt(this.maintenanceForm.controls.km.value),
        cost: parseInt(this.maintenanceForm.controls.cost.value)
      };
      if (this.maintenanceForm.controls.observation.value) {
        newMaintenance = {
          ...newMaintenance,
          observation: this.maintenanceForm.controls.observation.value
        }
      }

      this.store.dispatch(fromMaintenancesActions.addMaintenance({
        vehicleRef: this.vehicleSelected?.id ? this.vehicleSelected?.id : null,
        driverRef: this.driver?.docRef ? this.driver?.docRef : null,
        maintenance: newMaintenance
      }));

      this.unsubscribe.push(
        this.store.select(fromMaintenancesSelectors.selectAddMaintenance).subscribe(response => {
          this.addMaintenanceLoading = response.loading;
          if (response.loaded) {
            this.maintenanceForm.reset();
            this.closeMaintenanceModalButton.nativeElement.click();
            alert.fire({
              icon: 'success',
              title: response.msg,
              text: '¡Increible!',
              timer: 1000,
              showConfirmButton: false
            });
          }
          if (response.failed) {
            alert.fire({
              icon: 'error',
              title: 'Error al guardar la deduccion :C',
              timer: 500,
              showConfirmButton: false
            });
          }
        })
      );
    }
  }

  removeMaintenance(id: string | undefined) {
    if (id == undefined) {
      return;
    }
    alert.fire({
      icon: 'question',
      title: 'Estas segur@?',
      text: 'Confirma si estás seguro de eliminar este mantenimiento',
      showConfirmButton: true,
      confirmButtonText: 'Confirmar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar'
    }).then(alertResponse => {
      if (alertResponse.isConfirmed) {
        this.store.dispatch(fromMaintenancesActions.removeMaintenance({ id }));
        this.unsubscribe.push(
          this.store.select(fromMaintenancesSelectors.selectRemoveMaintenance).subscribe(response => {
            this.removeMaintenanceLoading = response.loading;
            if (response.loaded) {
              alert.fire({
                icon: 'success',
                title: response.msg,
                text: '¡Increible!',
                timer: 1000,
                showConfirmButton: false
              });
            }
            if (response.failed) {
              alert.fire({
                icon: 'error',
                title: 'Error al eliminar el mantenimiento :C',
                timer: 500,
                showConfirmButton: false
              });
            }
          })
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach(subscription => subscription.unsubscribe());
  }

}
