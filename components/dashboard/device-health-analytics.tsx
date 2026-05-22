"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchDeviceHealth } from "@/lib/api";
import { DeviceHealthData } from "@/lib/types";
import { Activity, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

function ChartSkeleton() {
    return (
        <div className="h-[350px] w-full space-y-4">
            <div className="flex gap-4">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-[300px] w-full" />
        </div>
    );
}

export function DeviceHealthAnalytics() {
    const [data, setData] = useState<DeviceHealthData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [chartType, setChartType] = useState<"area" | "bar">("area");

    useEffect(() => {
        fetchDeviceHealth()
            .then(setData)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (error) {
        return (
            <Card className="border-destructive/50">
                <CardHeader>
                    <CardTitle className="text-destructive">Error Loading Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{error}</p>
                </CardContent>
            </Card>
        );
    }

    const latestMonth = data[data.length - 1];
    const previousMonth = data[data.length - 2];
    const healthyTrend = latestMonth && previousMonth
        ? ((latestMonth.healthy - previousMonth.healthy) / previousMonth.healthy) * 100
        : 0;

    return (
        <Card className="h-full">
            <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <CardTitle className="flex items-center gap-2">
                        <Activity className="h-5 w-5 text-primary" />
                        Device Health Analytics
                    </CardTitle>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setChartType("area")}
                            className={`rounded-md px-3 py-1 text-sm transition-colors ${chartType === "area"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground hover:bg-muted/80"
                                }`}
                        >
                            Area
                        </button>
                        <button
                            onClick={() => setChartType("bar")}
                            className={`rounded-md px-3 py-1 text-sm transition-colors ${chartType === "bar"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground hover:bg-muted/80"
                                }`}
                        >
                            Bar
                        </button>
                    </div>
                </div>
                {latestMonth && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <TrendingUp className={`h-4 w-4 ${healthyTrend >= 0 ? "text-emerald-500" : "text-red-500"}`} />
                        <span>
                            {healthyTrend >= 0 ? "+" : ""}
                            {healthyTrend.toFixed(1)}% healthy devices from last month
                        </span>
                    </div>
                )}
            </CardHeader>
            <CardContent>
                {loading ? (
                    <ChartSkeleton />
                ) : (
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            {chartType === "area" ? (
                                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorHealthy" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                                        </linearGradient>
                                        <linearGradient id="colorWarning" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1} />
                                        </linearGradient>
                                        <linearGradient id="colorCritical" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                    <XAxis
                                        dataKey="month"
                                        className="text-xs"
                                        tick={{ fill: "hsl(var(--muted-foreground))" }}
                                    />
                                    <YAxis
                                        className="text-xs"
                                        tick={{ fill: "hsl(var(--muted-foreground))" }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "hsl(var(--card))",
                                            borderColor: "hsl(var(--border))",
                                            borderRadius: "8px",
                                        }}
                                        labelStyle={{ color: "hsl(var(--foreground))" }}
                                    />
                                    <Legend />
                                    <Area
                                        type="monotone"
                                        dataKey="healthy"
                                        stroke="#10b981"
                                        fillOpacity={1}
                                        fill="url(#colorHealthy)"
                                        name="Healthy"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="warning"
                                        stroke="#f59e0b"
                                        fillOpacity={1}
                                        fill="url(#colorWarning)"
                                        name="Warning"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="critical"
                                        stroke="#ef4444"
                                        fillOpacity={1}
                                        fill="url(#colorCritical)"
                                        name="Critical"
                                    />
                                </AreaChart>
                            ) : (
                                <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                    <XAxis
                                        dataKey="month"
                                        className="text-xs"
                                        tick={{ fill: "hsl(var(--muted-foreground))" }}
                                    />
                                    <YAxis
                                        className="text-xs"
                                        tick={{ fill: "hsl(var(--muted-foreground))" }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "hsl(var(--card))",
                                            borderColor: "hsl(var(--border))",
                                            borderRadius: "8px",
                                        }}
                                        labelStyle={{ color: "hsl(var(--foreground))" }}
                                    />
                                    <Legend />
                                    <Bar dataKey="healthy" fill="#10b981" name="Healthy" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="warning" fill="#f59e0b" name="Warning" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="critical" fill="#ef4444" name="Critical" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            )}
                        </ResponsiveContainer>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
