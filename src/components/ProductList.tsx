import { useNavigate } from "react-router-dom";
import { mockProducts } from "@/data/mockProducts";
import { SyncBadge } from "@/components/SyncBadge";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Lock, ChevronRight, Globe } from "lucide-react";

export function ProductList() {
  const navigate = useNavigate();

  return (
    <div className="space-y-2">
      {mockProducts.map((product) => (
        <Card
          key={product.id}
          className="p-4 cursor-pointer hover:shadow-md transition-shadow border-border/60"
          onClick={() => navigate(`/producten/${product.id}`)}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                {product.isLandelijk && (
                  <Globe className="h-3.5 w-3.5 text-primary shrink-0" />
                )}
                <h3 className="font-heading font-semibold text-foreground truncate">
                  {product.name}
                </h3>
                <Badge variant="secondary" className="text-xs shrink-0">
                  {product.category}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>Laatst bewerkt: {product.lastEdited}</span>
                {product.lastPublished && (
                  <span>Gepubliceerd: {product.lastPublished}</span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 ml-4">
              <div className="flex flex-col gap-1 items-end">
                <div className="flex items-center gap-1.5">
                  <ExternalLink className="h-3 w-3 text-muted-foreground" />
                  <SyncBadge status={product.externalSyncStatus} />
                </div>
                <div className="flex items-center gap-1.5">
                  <Lock className="h-3 w-3 text-muted-foreground" />
                  <SyncBadge status={product.internalSyncStatus} />
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
