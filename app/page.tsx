import { AssetHealthSummary } from "@/components/dashboard/asset-health-summary";
import { BuildingMap } from "@/components/dashboard/building-map";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DeviceHealthAnalytics } from "@/components/dashboard/device-health-analytics";
import { OrganizationOverview } from "@/components/dashboard/organization-overview";
import { ProductUpdates } from "@/components/dashboard/product-updates";
import { SystemAlerts } from "@/components/dashboard/system-alerts";


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

        <OrganizationOverview />

        <div className="grid gap-6 lg:grid-cols-2">
          <ProductUpdates />

          <AssetHealthSummary />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <BuildingMap />

          <DeviceHealthAnalytics />

          <SystemAlerts />

        </div>
        {/* Footer */}
        <footer className="border-t pt-6 pb-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>&copy; 2026 SmartBuild. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Contact</a>
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
}
