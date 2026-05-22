"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchBuildings } from "@/lib/api";
import { Building } from "@/lib/types";
import { MapPin } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const MapComponent = dynamic(() => import("./map-component"), {
    ssr: false,
    loading: () => <MapSkeleton />,
});

function MapSkeleton() {
    return (
        <div className="h-[400px] w-full rounded-lg overflow-hidden">
            <Skeleton className="h-full w-full" />
        </div>
    );
}

export function BuildingMap() {
    const [buildings, setBuildings] = useState<Building[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchBuildings()
            .then(setBuildings)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (error) {
        return (
            <Card className="border-destructive/50">
                <CardHeader>
                    <CardTitle className="text-destructive">Error Loading Map</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{error}</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="h-full">
            <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Building Locations
                </CardTitle>
            </CardHeader>
            <CardContent>
                {loading ? <MapSkeleton /> : <MapComponent buildings={buildings} />}
            </CardContent>
        </Card>
    );
}
