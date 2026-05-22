"use client";

import { Badge } from "@/components/ui/badge";
import { Building } from "@/lib/types";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Activity, Building2, Layers, MapPin } from "lucide-react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

interface MapComponentProps {
    buildings: Building[];
}

const customIcon = new Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

export default function MapComponent({ buildings }: MapComponentProps) {

    const center: [number, number] = buildings.length > 0
        ? [
            buildings.reduce((sum, b) => sum + b.geoLocation[0], 0) / buildings.length,
            buildings.reduce((sum, b) => sum + b.geoLocation[1], 0) / buildings.length,
        ]
        : [12.9716, 77.5946];

    return (
        <div className="h-[400px] w-full rounded-lg overflow-hidden border">
            <MapContainer
                center={center}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {buildings.map((building) => (
                    <Marker
                        key={building.id}
                        position={building.geoLocation}
                        icon={customIcon}
                    >
                        <Popup>
                            <div className="min-w-[200px] space-y-3 p-1">
                                <div className="flex items-center gap-2">
                                    <Building2 className="h-5 w-5 text-primary" />
                                    <span className="font-semibold text-base">{building.name}</span>
                                </div>

                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <MapPin className="h-4 w-4" />
                                        <span>{building.city}</span>
                                    </div>

                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Layers className="h-4 w-4" />
                                        <span>{building.totalFloors} Floor{building.totalFloors > 1 ? "s" : ""}</span>
                                    </div>

                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Activity className="h-4 w-4" />
                                        <span>Area: {building.area.toLocaleString()} sq ft</span>
                                    </div>
                                </div>

                                <div className="pt-1">
                                    <Badge
                                        variant={building.healthScore >= 70 ? "default" : building.healthScore >= 50 ? "secondary" : "destructive"}
                                        className={building.healthScore >= 70 ? "bg-emerald-500 text-white" : ""}
                                    >
                                        Health Score: {building.healthScore}%
                                    </Badge>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
