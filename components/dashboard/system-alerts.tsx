"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchWithError } from "@/lib/api";
import { AlertTriangle, Bell, RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";

interface SystemAlert {
    id: string;
    title: string;
    severity: "critical" | "warning" | "info";
    timestamp: string;
}

export function SystemAlerts() {
    const [alerts, setAlerts] = useState<SystemAlert[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadAlerts = async () => {
        setLoading(true);
        setError(null);
        try {
            await fetchWithError();
            setAlerts([]);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load system alerts");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAlerts();
    }, []);

    return (
        <Card className="h-full w-full">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Bell className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">System Alerts</CardTitle>
                    </div>

                </div>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="space-y-3">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <Skeleton className="h-8 w-8 rounded-full shrink-0" />
                                <div className="space-y-2 flex-1">
                                    <Skeleton className="h-4 w-3/4" />
                                    <Skeleton className="h-3 w-1/2" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                        <div className="rounded-full bg-destructive/10 p-3 mb-4">
                            <AlertTriangle className="h-6 w-6 text-destructive" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-1">
                            Unable to Load Alerts
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 max-w-[250px]">
                            {error}
                        </p>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={loadAlerts}
                            className="gap-2"
                        >
                            <RefreshCcw className="h-4 w-4" />
                            Try Again
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {alerts.map((alert) => (
                            <div key={alert.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50">
                                <span className="text-lg">{alert.title}</span>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
