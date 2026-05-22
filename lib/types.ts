export interface OverviewData {
    campuses: number;
    buildings: number;
    floors: number;
    rooms: number;
    users: number;
    assets: number;
    workOrders: number;
    workRequests: number;
    alarms: number;
    gateways: number;
    wiredDevices: number;
    wirelessDevices: number;
    healthScore: number;
    areaSqFt: number;
}

export interface ProductUpdate {
    id: number;
    title: string;
    version: string;
    releaseDate: number;
}

export interface FloorData {
    name: string;
    assets: {
        healthy: number;
        warning: number;
        critical: number;
    };
    energy: {
        consumption: number;
        unit: string;
    };
}

export interface BuildingHealth {
    building: string;
    floors: FloorData[];
}

export interface Building {
    id: number;
    name: string;
    city: string;
    area: number;
    totalFloors: number;
    healthScore: number;
    geoLocation: [number, number];
}

export interface DeviceHealthData {
    month: string;
    healthy: number;
    warning: number;
    critical: number;
}
