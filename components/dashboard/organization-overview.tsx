"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchOverviewData } from "@/lib/api";
import { OverviewData } from "@/lib/types";
import {
    Activity,
    AlertTriangle,
    Building2,
    Cable,
    ClipboardList,
    DoorOpen,
    Home,
    LayoutGrid,
    MapPin,
    Package,
    Router,
    Users,
    Wifi,
} from "lucide-react";
import { useEffect, useState } from "react";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    description?: string;
    highlight?: boolean;
}

function StatCard({ title, value, icon, description, highlight }: StatCardProps) {
    return (
        <Card className={`transition-all hover:shadow-lg ${highlight ? "border-emerald-500/50 bg-emerald-500/5" : ""}`}>
            <CardContent className="p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className={`rounded-lg p-2 ${highlight ? "bg-emerald-500/20 text-emerald-500" : "bg-muted text-muted-foreground"}`}>
                            {icon}
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">{title}</p>
                            <p className="text-2xl font-bold">{value}</p>
                            {description && (
                                <p className="text-xs text-muted-foreground">{description}</p>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function StatCardSkeleton() {
    return (
        <Card>
            <CardContent className="p-4">
                <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-lg" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-7 w-16" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export function OrganizationOverview() {
    const [data, setData] = useState<OverviewData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchOverviewData()
            .then(setData)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (error) {
        return (
            <Card className="border-destructive/50">
                <CardHeader>
                    <CardTitle className="text-destructive">Error Loading Overview</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{error}</p>
                </CardContent>
            </Card>
        );
    }

    const stats = data
        ? [
            { title: "Campuses", value: data.campuses, icon: <MapPin className="h-5 w-5" /> },
            { title: "Buildings", value: data.buildings, icon: <Building2 className="h-5 w-5" /> },
            { title: "Floors", value: data.floors, icon: <LayoutGrid className="h-5 w-5" /> },
            { title: "Rooms", value: data.rooms, icon: <DoorOpen className="h-5 w-5" /> },
            { title: "Users", value: data.users, icon: <Users className="h-5 w-5" /> },
            { title: "Assets", value: data.assets, icon: <Package className="h-5 w-5" /> },
            { title: "Work Orders", value: data.workOrders.toLocaleString(), icon: <ClipboardList className="h-5 w-5" /> },
            { title: "Work Requests", value: data.workRequests, icon: <Home className="h-5 w-5" /> },
            { title: "Alarms", value: data.alarms, icon: <AlertTriangle className="h-5 w-5" /> },
            { title: "Gateways", value: data.gateways, icon: <Router className="h-5 w-5" /> },
            { title: "Wired Devices", value: data.wiredDevices, icon: <Cable className="h-5 w-5" /> },
            { title: "Wireless Devices", value: data.wirelessDevices, icon: <Wifi className="h-5 w-5" /> },
            {
                title: "Health Score",
                value: `${data.healthScore}%`,
                icon: <Activity className="h-5 w-5" />,
                highlight: true,
            },
            {
                title: "Total Area",
                value: `${data.areaSqFt.toLocaleString()} sq ft`,
                icon: <LayoutGrid className="h-5 w-5" />,
            },
        ]
        : [];

    return (
        <Card>
            <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    Organization Overview
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
                    {loading
                        ? Array.from({ length: 14 }).map((_, i) => <StatCardSkeleton key={i} />)
                        : stats.map((stat) => (
                            <StatCard
                                key={stat.title}
                                title={stat.title}
                                value={stat.value}
                                icon={stat.icon}
                                highlight={"highlight" in stat && stat.highlight}
                            />
                        ))}
                </div>
            </CardContent>
        </Card>
    );
}
