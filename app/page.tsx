import { DashboardHeader } from "@/components/dashboard/dashboard-header";


export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Page Title */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground">
            Monitor your smart buildings, assets, and device health in real-time.
          </p>
        </div>

      </main>
    </div>
  );
}
