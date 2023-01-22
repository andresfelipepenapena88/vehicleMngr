export interface Maintenance {
    id?: string;
    cost: number;
    date: string;
    km: number;
    type: string;
    observation?: string;
    vehicleByDriver?: string;
}