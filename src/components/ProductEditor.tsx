import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockProducts } from "@/data/mockProducts";
import { SyncBadge } from "@/components/SyncBadge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  ExternalLink,
  Lock,
  Download,
  RefreshCw,
  Save,
  Eye,
} from "lucide-react";
import { toast } from "sonner";

export function ProductEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = mockProducts.find((p) => p.id === id);

  const [activeTab, setActiveTab] = useState<"external" | "internal">("external");
  const [externalContent, setExternalContent] = useState(product?.externalContent ?? "");
  const [internalContent, setInternalContent] = useState(product?.internalContent ?? "");
  const [importOpen, setImportOpen] = useState(false);

  if (!product) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Product niet gevonden.
      </div>
    );
  }

  const handleImport = (target: "external" | "internal" | "both") => {
    if (target === "external" || target === "both") {
      setExternalContent(product.standardText);
    }
    if (target === "internal" || target === "both") {
      setInternalContent(product.standardText);
    }
    setImportOpen(false);
    toast.success("Standaardtekst geïmporteerd");
  };

  const handleSave = () => {
    toast.success("Wijzigingen opgeslagen");
  };

  const handleSync = () => {
    toast.success("Synchronisatie gestart voor " + product.name);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/producten")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-heading font-bold text-foreground">
              {product.name}
            </h1>
            <p className="text-sm text-muted-foreground">{product.category}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={importOpen} onOpenChange={setImportOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1.5" />
                Importeer standaardtekst
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-heading">
                  Standaardtekst importeren
                </DialogTitle>
                <DialogDescription>
                  Importeer de landelijke standaardtekst als startpunt. U kunt
                  deze daarna aanpassen aan uw gemeente.
                </DialogDescription>
              </DialogHeader>
              <Card className="bg-muted/50">
                <CardContent className="p-4">
                  <p className="text-sm text-foreground leading-relaxed">
                    {product.standardText}
                  </p>
                </CardContent>
              </Card>
              <DialogFooter className="gap-2 sm:gap-0">
                <Button
                  variant="outline"
                  onClick={() => handleImport("external")}
                >
                  Naar externe versie
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleImport("internal")}
                >
                  Naar interne versie
                </Button>
                <Button onClick={() => handleImport("both")}>
                  Naar beide versies
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button variant="outline" size="sm" onClick={handleSync}>
            <RefreshCw className="h-4 w-4 mr-1.5" />
            Synchroniseer
          </Button>

          <Button size="sm" onClick={handleSave}>
            <Save className="h-4 w-4 mr-1.5" />
            Opslaan
          </Button>
        </div>
      </div>

      {/* Sync status overview */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="border-border/60">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Externe versie</span>
            </div>
            <SyncBadge status={product.externalSyncStatus} />
          </CardContent>
        </Card>
        <Card className="border-border/60">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Interne versie</span>
            </div>
            <SyncBadge status={product.internalSyncStatus} />
          </CardContent>
        </Card>
      </div>

      {/* Editor tabs */}
      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as "external" | "internal")}
      >
        <TabsList className="w-full justify-start">
          <TabsTrigger value="external" className="gap-1.5">
            <ExternalLink className="h-3.5 w-3.5" />
            Externe versie
          </TabsTrigger>
          <TabsTrigger value="internal" className="gap-1.5">
            <Lock className="h-3.5 w-3.5" />
            Interne versie
          </TabsTrigger>
        </TabsList>

        <TabsContent value="external" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-heading flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                Externe tekst — voor inwoners
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={externalContent}
                onChange={(e) => setExternalContent(e.target.value)}
                placeholder="Voer hier de externe tekst in die op de gemeentelijke website wordt getoond..."
                className="min-h-[300px] font-body text-sm leading-relaxed"
              />
              <div className="flex justify-end mt-3">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-1.5" />
                  Voorbeeld bekijken
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="internal" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-heading flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Interne tekst — voor medewerkers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={internalContent}
                onChange={(e) => setInternalContent(e.target.value)}
                placeholder="Voer hier de interne tekst in die medewerkers op de interne kennisbank zien..."
                className="min-h-[300px] font-body text-sm leading-relaxed"
              />
              <div className="flex justify-end mt-3">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-1.5" />
                  Voorbeeld bekijken
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
