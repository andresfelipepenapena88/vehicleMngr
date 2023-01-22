import { Deduction } from "./deduction.model";

export interface Payment {
    id?: string;
    status: boolean;
    startDate: string;
    endDate: string;
    vehicleByDriver: string;
    deductions?: Deduction[];
    totalDeductions?: number;
}