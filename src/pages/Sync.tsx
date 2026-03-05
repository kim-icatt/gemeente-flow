import { mockProducts } from "@/data/mockProducts";
import { SyncBadge } from "@/components/SyncBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, ExternalLink, Lock } from "lucide-react";
import { toast } from "sonner";

const Sync = () => {
  const needsAttention = mockProducts.filter(
    (p) =>
      p.externalSyncStatus !== "synced" || p.internalSyncStatus !== "synced"
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">
            Synchronisatie
          </h1>
          <p className="text-muted-foreground mt-1">
            Houd uw gepubliceerde content up-to-date
          </p>
        </div>
        <Button
          size="sm"
          onClick={() => toast.success("Alle producten worden gesynchroniseerd")}
        >
          <RefreshCw className="h-4 w-4 mr-1.5" />
          Alles synchroniseren
        </Button>
      </div>

      {needsAttention.length === 0 ? (
        <Card className="border-success/30 bg-success/5">
          <CardContent className="p-6 text-center">
            <p className="text-success font-medium">
              ✓ Alle producten zijn gesynchroniseerd
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            {needsAttention.length} product(en) vereisen aandacht
          </p>
          {needsAttention.map((product) => (
            <Card key={product.id} className="border-border/60">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-heading font-semibold text-foreground">
                      {product.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {product.category} · Laatst bewerkt: {product.lastEdited}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
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
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        toast.success(`${product.name} gesynchroniseerd`)
                      }
                    >
                      <RefreshCw className="h-3.5 w-3.5 mr-1" />
                      Sync
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sync;
