import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertTriangle, FileEdit, CloudOff } from "lucide-react";
import type { SyncStatus } from "@/data/mockProducts";

const config: Record<SyncStatus, { label: string; icon: typeof CheckCircle2; className: string }> = {
  synced: {
    label: "Gesynchroniseerd",
    icon: CheckCircle2,
    className: "bg-success/15 text-success border-success/30 hover:bg-success/20",
  },
  outdated: {
    label: "Verouderd",
    icon: AlertTriangle,
    className: "bg-warning/15 text-warning border-warning/30 hover:bg-warning/20",
  },
  draft: {
    label: "Concept",
    icon: FileEdit,
    className: "bg-info/15 text-info border-info/30 hover:bg-info/20",
  },
  "not-published": {
    label: "Niet gepubliceerd",
    icon: CloudOff,
    className: "bg-muted text-muted-foreground border-border hover:bg-muted",
  },
};

export function SyncBadge({ status }: { status: SyncStatus }) {
  const { label, icon: Icon, className } = config[status];
  return (
    <Badge variant="outline" className={`gap-1 text-xs font-normal ${className}`}>
      <Icon className="h-3 w-3" />
      {label}
    </Badge>
  );
}
