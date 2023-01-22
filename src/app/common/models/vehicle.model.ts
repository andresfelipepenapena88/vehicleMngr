export interface Vehicle {
    id: string,
    license: string;
    type: string;
    brand: string;
    reference: string;
    model: number;
    driver: any;
    liquidation: number;
    pyp: string; // Pico y placa
}