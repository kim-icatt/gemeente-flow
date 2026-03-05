import { ProductList } from "@/components/ProductList";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";

const Producten = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">
            Producten
          </h1>
          <p className="text-muted-foreground mt-1">
            Beheer alle producten in uw catalogus
          </p>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-1.5" />
          Nieuw product
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Zoek producten..." className="pl-9" />
      </div>

      <ProductList />
    </div>
  );
};

export default Producten;
