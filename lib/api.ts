import {
    Building,
    BuildingHealth,
    DeviceHealthData,
    OverviewData,
    ProductUpdate,
} from "./types";

// Simulated network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Generic fetch function with simulated latency
async function fetchWithDelay<T>(url: string, delayMs: number = 1500): Promise<T> {
    await delay(delayMs);
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    }
    return response.json();
}

export async function fetchOverviewData(): Promise<OverviewData> {
    return fetchWithDelay<OverviewData>("/data/overview.json", 1200);
}

export async function fetchProductUpdates(): Promise<ProductUpdate[]> {
    return fetchWithDelay<ProductUpdate[]>("/data/updates.json", 1000);
}

export async function fetchAssetHealth(): Promise<BuildingHealth[]> {
    return fetchWithDelay<BuildingHealth[]>("/data/asset-health.json", 1800);
}

export async function fetchBuildings(): Promise<Building[]> {
    return fetchWithDelay<Building[]>("/data/buildings.json", 1400);
}

export async function fetchDeviceHealth(): Promise<DeviceHealthData[]> {
    return fetchWithDelay<DeviceHealthData[]>("/data/device-health.json", 1600);
}

// Simulate an error for demonstration (can be used for error handling demo)
export async function fetchWithError(): Promise<never> {
    await delay(1000);
    throw new Error("Simulated API error - Unable to fetch data");
}
