import { useNavigate } from "react-router-dom";
import { mockProducts } from "@/data/mockProducts";
import { SyncBadge } from "@/components/SyncBadge";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Lock, ChevronRight, Globe } from "lucide-react";

const MijnLandelijkeProducten = () => {
  const navigate = useNavigate();
  const landelijkeProducten = mockProducts.filter((p) => p.isLandelijk);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold text-foreground">
          Mijn landelijke producten
        </h1>
        <p className="text-muted-foreground mt-1">
          Producten waarvoor uw gemeente verantwoordelijk is op landelijk niveau
        </p>
      </div>

      {landelijkeProducten.length === 0 ? (
        <Card className="p-8 text-center">
          <Globe className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">
            Er zijn geen landelijke producten toegewezen aan uw gemeente.
          </p>
        </Card>
      ) : (
        <div className="space-y-2">
          {landelijkeProducten.map((product) => (
            <Card
              key={product.id}
              className="p-4 cursor-pointer hover:shadow-md transition-shadow border-border/60"
              onClick={() => navigate(`/producten/${product.id}`)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Globe className="h-4 w-4 text-primary shrink-0" />
                    <h3 className="font-heading font-semibold text-foreground truncate">
                      {product.name}
                    </h3>
                    <Badge variant="secondary" className="text-xs shrink-0">
                      {product.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground ml-6">
                    <span>Laatst bewerkt: {product.lastEdited}</span>
                    <span>{product.standardSections.length} standaardsecties</span>
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
      )}
    </div>
  );
};

export default MijnLandelijkeProducten;
