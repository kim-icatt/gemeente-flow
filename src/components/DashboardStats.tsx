import { Card, CardContent } from "@/components/ui/card";
import { FileText, CheckCircle2, AlertTriangle, Globe } from "lucide-react";
import { mockProducts } from "@/data/mockProducts";

export function DashboardStats() {
  const total = mockProducts.length;
  const synced = mockProducts.filter(
    (p) => p.externalSyncStatus === "synced" && p.internalSyncStatus === "synced"
  ).length;
  const outdated = mockProducts.filter(
    (p) => p.externalSyncStatus === "outdated" || p.internalSyncStatus === "outdated"
  ).length;
  const landelijk = mockProducts.filter((p) => p.isLandelijk).length;

  const stats = [
    {
      label: "Totaal producten",
      value: total,
      icon: FileText,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Gesynchroniseerd",
      value: synced,
      icon: CheckCircle2,
      color: "text-success",
      bg: "bg-success/10",
    },
    {
      label: "Afwijkingen",
      value: outdated,
      icon: AlertTriangle,
      color: "text-warning",
      bg: "bg-warning/10",
    },
    {
      label: "Landelijke producten",
      value: landelijk,
      icon: Globe,
      color: "text-info",
      bg: "bg-info/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="border-border/60">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-heading font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
