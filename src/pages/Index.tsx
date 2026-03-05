import { DashboardStats } from "@/components/DashboardStats";
import { ProductList } from "@/components/ProductList";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold text-foreground">
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Overzicht van uw producten- en dienstencatalogus
        </p>
      </div>

      <DashboardStats />

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-heading font-semibold text-foreground">
            Recente producten
          </h2>
          <button
            onClick={() => navigate("/producten")}
            className="text-sm text-primary hover:underline"
          >
            Alle producten bekijken →
          </button>
        </div>
        <ProductList />
      </div>
    </div>
  );
};

export default Index;
