"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { fetchAssetHealth } from "@/lib/api";
import { BuildingHealth } from "@/lib/types";
import { Building2, Zap, CheckCircle, AlertTriangle, XCircle } from "lucide-react";

function AssetHealthSkeleton() {
    return (
        <div className= "space-y-4" >
        {
            Array.from({ length: 2 }).map((_, i) => (
                <div key= { i } className = "space-y-3 rounded-lg border p-4" >
                <Skeleton className="h-6 w-40" />
            <Skeleton className="h-20 w-full" />
            </div>
            ))
        }
        </div>
  );
}

export function AssetHealthSummary() {
    const [data, setData] = useState<BuildingHealth[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchAssetHealth()
            .then(setData)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (error) {
        return (
            <Card className= "border-destructive/50" >
            <CardHeader>
            <CardTitle className="text-destructive" > Error Loading Asset Health </CardTitle>
                </CardHeader>
                < CardContent >
                <p className="text-muted-foreground" > { error } </p>
                    </CardContent>
                    </Card>
    );
    }

    return (
        <Card className= "h-full" >
        <CardHeader className="pb-4" >
            <CardTitle className="flex items-center gap-2" >
                <Building2 className="h-5 w-5 text-primary" />
                    Asset Health Summary
                        </CardTitle>
                        </CardHeader>
                        <CardContent>
    {
        loading ? (
            <AssetHealthSkeleton />
        ) : (
            <Accordion type= "multiple" className = "w-full" defaultValue = { data.map((b) => b.building) } >
            {
                data.map((building) => {
                    const totalAssets = building.floors.reduce(
                        (acc, floor) =>
                            acc + floor.assets.healthy + floor.assets.warning + floor.assets.critical,
                        0
                    );
                    const totalHealthy = building.floors.reduce(
                        (acc, floor) => acc + floor.assets.healthy,
                        0
                    );
                    const healthPercent = Math.round((totalHealthy / totalAssets) * 100);
                    const totalEnergy = building.floors.reduce(
                        (acc, floor) => acc + floor.energy.consumption,
                        0
                    );

                    return (
                        <AccordionItem key= { building.building } value = { building.building } className = "border rounded-lg mb-3 px-1" >
                            <AccordionTrigger className="hover:no-underline px-3" >
                                <div className="flex flex-1 items-center justify-between pr-4" >
                                    <div className="flex items-center gap-3" >
                                        <Building2 className="h-5 w-5 text-primary" />
                                            <span className="font-semibold" > { building.building } </span>
                                                </div>
                                                < div className = "flex items-center gap-4 text-sm text-muted-foreground" >
                                                    <Badge
                          variant={ healthPercent >= 80 ? "default" : healthPercent >= 60 ? "secondary" : "destructive" }
                    className = { healthPercent >= 80 ? "bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500/30" : ""
                }
                        >
                    { healthPercent } % Healthy
                    </Badge>
                    < span className = "hidden sm:flex items-center gap-1" >
                    <Zap className="h-4 w-4 text-yellow-500" />
                { totalEnergy } kWh
                </span>
                </div>
                </div>
                </AccordionTrigger>
                < AccordionContent className = "px-3 pb-4" >
                <div className="space-y-4 pt-2" >
                {
                    building.floors.map((floor) => {
                        const floorTotal =
                            floor.assets.healthy + floor.assets.warning + floor.assets.critical;
                        const floorHealthPercent = Math.round(
                            (floor.assets.healthy / floorTotal) * 100
                        );

                        return (
                            <div
                            key= { floor.name }
                        className = "rounded-lg border bg-muted/30 p-4 space-y-3"
                            >
                            <div className="flex items-center justify-between" >
                                <span className="font-medium" > { floor.name } </span>
                                    < span className = "flex items-center gap-1 text-sm text-muted-foreground" >
                                        <Zap className="h-3 w-3 text-yellow-500" />
                                            { floor.energy.consumption } { floor.energy.unit }
                        </span>
                            </div>

                            < div className = "space-y-2" >
                                <div className="flex justify-between text-sm" >
                                    <span className="text-muted-foreground" > Asset Health </span>
                                        < span className = "font-medium" > { floorHealthPercent } % </span>
                                            </div>
                                            < Progress value = { floorHealthPercent } className = "h-2" />
                                                </div>

                                                < div className = "grid grid-cols-3 gap-2 text-sm" >
                                                    <div className="flex items-center gap-2 rounded-md bg-emerald-500/10 p-2" >
                                                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                                                            <div>
                                                            <p className="text-xs text-muted-foreground" > Healthy </p>
                                                                < p className = "font-semibold text-emerald-500" >
                                                                    { floor.assets.healthy }
                                                                    </p>
                                                                    </div>
                                                                    </div>
                                                                    < div className = "flex items-center gap-2 rounded-md bg-yellow-500/10 p-2" >
                                                                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                                                            <div>
                                                                            <p className="text-xs text-muted-foreground" > Warning </p>
                                                                                < p className = "font-semibold text-yellow-500" >
                                                                                    { floor.assets.warning }
                                                                                    </p>
                                                                                    </div>
                                                                                    </div>
                                                                                    < div className = "flex items-center gap-2 rounded-md bg-red-500/10 p-2" >
                                                                                        <XCircle className="h-4 w-4 text-red-500" />
                                                                                            <div>
                                                                                            <p className="text-xs text-muted-foreground" > Critical </p>
                                                                                                < p className = "font-semibold text-red-500" >
                                                                                                    { floor.assets.critical }
                                                                                                    </p>
                                                                                                    </div>
                                                                                                    </div>
                                                                                                    </div>
                                                                                                    </div>
                        );
                })
            }
                </div>
                </AccordionContent>
                </AccordionItem>
              );
    })
}
</Accordion>
        )}
</CardContent>
    </Card>
  );
}
