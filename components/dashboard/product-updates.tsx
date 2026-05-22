"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchProductUpdates } from "@/lib/api";
import { ProductUpdate } from "@/lib/types";
import { Bug, Calendar, Mail, Newspaper, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

function getIcon(title: string) {
    if (title.toLowerCase().includes("dashboard")) return <Sparkles className="h-4 w-4" />;
    if (title.toLowerCase().includes("widget")) return <Sparkles className="h-4 w-4" />;
    if (title.toLowerCase().includes("email") || title.toLowerCase().includes("notification"))
        return <Mail className="h-4 w-4" />;
    if (title.toLowerCase().includes("bug")) return <Bug className="h-4 w-4" />;
    return <Newspaper className="h-4 w-4" />;
}

function formatDate(timestamp: number) {
    return new Date(timestamp).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

function UpdateSkeleton() {
    return (
        <div className="flex items-start gap-4 border-l-2 border-muted pl-4">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <div className="flex gap-2">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-24" />
                </div>
            </div>
        </div>
    );
}

export function ProductUpdates() {
    const [updates, setUpdates] = useState<ProductUpdate[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchProductUpdates()
            .then(setUpdates)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (error) {
        return (
            <Card className="border-destructive/50">
                <CardHeader>
                    <CardTitle className="text-destructive">Error Loading Updates</CardTitle>
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
                    <Newspaper className="h-5 w-5 text-primary" />
                    Product Updates
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {loading
                        ? Array.from({ length: 4 }).map((_, i) => <UpdateSkeleton key={i} />)
                        : updates.map((update, index) => (
                            <div
                                key={update.id}
                                className={`flex items-start gap-4 border-l-2 pl-4 transition-colors ${index === 0 ? "border-emerald-500" : "border-muted hover:border-primary/50"
                                    }`}
                            >
                                <div
                                    className={`rounded-lg p-2 ${index === 0 ? "bg-emerald-500/20 text-emerald-500" : "bg-muted text-muted-foreground"
                                        }`}
                                >
                                    {getIcon(update.title)}
                                </div>
                                <div className="flex-1 space-y-1">
                                    <p className="font-medium leading-tight">{update.title}</p>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <Badge variant="secondary" className="text-xs">
                                            v{update.version}
                                        </Badge>
                                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                            <Calendar className="h-3 w-3" />
                                            {formatDate(update.releaseDate)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </CardContent>
        </Card>
    );
}

