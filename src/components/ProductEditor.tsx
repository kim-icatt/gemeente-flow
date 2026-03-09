import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockProducts, ContentBlock, HighlightedText, TemporaryText } from "@/data/mockProducts";
import { SyncBadge } from "@/components/SyncBadge";
import { SpotTheDifference } from "@/components/SpotTheDifference";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import {
  ArrowLeft,
  ExternalLink,
  Lock,
  Download,
  Search,
  Save,
  Plus,
  Trash2,
  Highlighter,
  Clock,
  MessageSquare,
  CalendarIcon,
  GripVertical,
} from "lucide-react";
import { toast } from "sonner";

export function ProductEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = mockProducts.find((p) => p.id === id);

  const [activeTab, setActiveTab] = useState<"external" | "internal">("external");
  const [externalBlocks, setExternalBlocks] = useState<ContentBlock[]>(product?.externalBlocks ?? []);
  const [internalBlocks, setInternalBlocks] = useState<ContentBlock[]>(product?.internalBlocks ?? []);
  const [externalHighlights, setExternalHighlights] = useState<HighlightedText[]>(product?.highlightedTexts.external ?? []);
  const [internalHighlights, setInternalHighlights] = useState<HighlightedText[]>(product?.highlightedTexts.internal ?? []);
  const [externalTempTexts, setExternalTempTexts] = useState<TemporaryText[]>(product?.temporaryTexts.external ?? []);
  const [internalTempTexts, setInternalTempTexts] = useState<TemporaryText[]>(product?.temporaryTexts.internal ?? []);
  const [importOpen, setImportOpen] = useState(false);
  const [showDiff, setShowDiff] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");

  // Dialogs for adding highlighted / temp text
  const [highlightDialogOpen, setHighlightDialogOpen] = useState(false);
  const [tempDialogOpen, setTempDialogOpen] = useState(false);
  const [newHighlightText, setNewHighlightText] = useState("");
  const [newHighlightPosition, setNewHighlightPosition] = useState("0");
  const [newTempText, setNewTempText] = useState("");
  const [newTempPosition, setNewTempPosition] = useState("0");
  const [newTempFrom, setNewTempFrom] = useState<Date | undefined>();
  const [newTempUntil, setNewTempUntil] = useState<Date | undefined>();

  if (!product) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Product niet gevonden.
      </div>
    );
  }

  const currentBlocks = activeTab === "external" ? externalBlocks : internalBlocks;
  const setCurrentBlocks = activeTab === "external" ? setExternalBlocks : setInternalBlocks;
  const currentHighlights = activeTab === "external" ? externalHighlights : internalHighlights;
  const setCurrentHighlights = activeTab === "external" ? setExternalHighlights : setInternalHighlights;
  const currentTempTexts = activeTab === "external" ? externalTempTexts : internalTempTexts;
  const setCurrentTempTexts = activeTab === "external" ? setExternalTempTexts : setInternalTempTexts;

  const handleImport = (target: "external" | "internal" | "both") => {
    const imported: ContentBlock[] = product.standardSections.map((s) => ({
      id: `imp-${s.id}-${Date.now()}`,
      header: s.header,
      body: s.body,
    }));
    if (target === "external" || target === "both") setExternalBlocks(imported);
    if (target === "internal" || target === "both") setInternalBlocks(imported.map(b => ({ ...b, id: b.id + "-int" })));
    setImportOpen(false);
    toast.success("Standaardtekst geïmporteerd");
  };

  const handleSave = () => toast.success("Wijzigingen opgeslagen");

  const updateBlock = (blockId: string, field: "header" | "body", value: string) => {
    setCurrentBlocks(currentBlocks.map((b) => b.id === blockId ? { ...b, [field]: value } : b));
  };

  const addBlock = () => {
    setCurrentBlocks([...currentBlocks, { id: `block-${Date.now()}`, header: "", body: "" }]);
  };

  const removeBlock = (blockId: string) => {
    setCurrentBlocks(currentBlocks.filter((b) => b.id !== blockId));
  };

  const addHighlightedText = () => {
    if (!newHighlightText.trim()) return;
    const ht: HighlightedText = {
      id: `hl-${Date.now()}`,
      text: newHighlightText,
      position: parseInt(newHighlightPosition),
    };
    setCurrentHighlights([...currentHighlights, ht]);
    setNewHighlightText("");
    setNewHighlightPosition("0");
    setHighlightDialogOpen(false);
    toast.success("Uitgelichte tekst toegevoegd");
  };

  const addTemporaryText = () => {
    if (!newTempText.trim() || !newTempFrom || !newTempUntil) return;
    const tt: TemporaryText = {
      id: `tmp-${Date.now()}`,
      text: newTempText,
      visibleFrom: format(newTempFrom, "yyyy-MM-dd"),
      visibleUntil: format(newTempUntil, "yyyy-MM-dd"),
      position: parseInt(newTempPosition),
    };
    setCurrentTempTexts([...currentTempTexts, tt]);
    setNewTempText("");
    setNewTempPosition("0");
    setNewTempFrom(undefined);
    setNewTempUntil(undefined);
    setTempDialogOpen(false);
    toast.success("Tijdelijke tekst toegevoegd");
  };

  const handleFeedback = () => {
    if (!feedbackText.trim()) return;
    toast.success("Feedback verzonden naar de landelijke beheerder");
    setFeedbackText("");
    setFeedbackOpen(false);
  };

  const positionOptions = [
    { value: "0", label: "Boven eerste blok" },
    ...currentBlocks.map((b, i) => ({ value: String(i + 1), label: `Na "${b.header || `Blok ${i + 1}`}"` })),
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/producten")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-heading font-bold text-foreground">{product.name}</h1>
            <p className="text-sm text-muted-foreground">{product.category}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Dialog open={importOpen} onOpenChange={setImportOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1.5" />
                Importeer standaardtekst
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle className="font-heading">Standaardtekst importeren</DialogTitle>
                <DialogDescription>
                  Importeer de landelijke standaardtekst als startpunt. De secties worden als blokken overgenomen.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {product.standardSections.map((s) => (
                  <Card key={s.id} className="bg-muted/50">
                    <CardContent className="p-3">
                      <p className="text-xs font-semibold text-muted-foreground mb-1">{s.header}</p>
                      <p className="text-sm text-foreground leading-relaxed">{s.body}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <DialogFooter className="gap-2 sm:gap-0">
                <Button variant="outline" onClick={() => handleImport("external")}>Naar externe versie</Button>
                <Button variant="outline" onClick={() => handleImport("internal")}>Naar interne versie</Button>
                <Button onClick={() => handleImport("both")}>Naar beide versies</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDiff(!showDiff)}
            className={showDiff ? "bg-accent" : ""}
          >
            <Search className="h-4 w-4 mr-1.5" />
            Synchroniseer
          </Button>

          <Button size="sm" onClick={handleSave}>
            <Save className="h-4 w-4 mr-1.5" />
            Opslaan
          </Button>
        </div>
      </div>

      {/* Spot the difference panel */}
      {showDiff && (
        <SpotTheDifference
          standardSections={product.standardSections}
          internalBlocks={internalBlocks}
          onClose={() => setShowDiff(false)}
        />
      )}

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
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "external" | "internal")}>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <TabsList>
            <TabsTrigger value="external" className="gap-1.5">
              <ExternalLink className="h-3.5 w-3.5" />
              Externe versie
            </TabsTrigger>
            <TabsTrigger value="internal" className="gap-1.5">
              <Lock className="h-3.5 w-3.5" />
              Interne versie
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            {/* Add highlighted text */}
            <Dialog open={highlightDialogOpen} onOpenChange={setHighlightDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Highlighter className="h-4 w-4 mr-1.5" />
                  Uitgelichte tekst
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="font-heading">Uitgelichte tekst toevoegen</DialogTitle>
                  <DialogDescription>Voeg een opvallend tekstblok toe dat extra aandacht trekt.</DialogDescription>
                </DialogHeader>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-foreground">Tekst</label>
                    <Textarea
                      value={newHighlightText}
                      onChange={(e) => setNewHighlightText(e.target.value)}
                      placeholder="Voer de uitgelichte tekst in..."
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Positie</label>
                    <Select value={newHighlightPosition} onValueChange={setNewHighlightPosition}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {positionOptions.map((o) => (
                          <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={addHighlightedText}>Toevoegen</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Add temporary text */}
            <Dialog open={tempDialogOpen} onOpenChange={setTempDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Clock className="h-4 w-4 mr-1.5" />
                  Tijdelijke tekst
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="font-heading">Tijdelijke tekst toevoegen</DialogTitle>
                  <DialogDescription>Deze tekst is alleen zichtbaar binnen de opgegeven periode.</DialogDescription>
                </DialogHeader>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-foreground">Tekst</label>
                    <Textarea
                      value={newTempText}
                      onChange={(e) => setNewTempText(e.target.value)}
                      placeholder="Voer de tijdelijke tekst in..."
                      className="mt-1"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium text-foreground">Zichtbaar vanaf</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className={cn("w-full mt-1 justify-start text-left font-normal", !newTempFrom && "text-muted-foreground")}>
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {newTempFrom ? format(newTempFrom, "d MMM yyyy", { locale: nl }) : "Selecteer datum"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={newTempFrom} onSelect={setNewTempFrom} className="p-3 pointer-events-auto" />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Zichtbaar tot</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className={cn("w-full mt-1 justify-start text-left font-normal", !newTempUntil && "text-muted-foreground")}>
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {newTempUntil ? format(newTempUntil, "d MMM yyyy", { locale: nl }) : "Selecteer datum"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={newTempUntil} onSelect={setNewTempUntil} className="p-3 pointer-events-auto" />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Positie</label>
                    <Select value={newTempPosition} onValueChange={setNewTempPosition}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {positionOptions.map((o) => (
                          <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={addTemporaryText}>Toevoegen</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Feedback button (internal only) */}
            {activeTab === "internal" && (
              <Dialog open={feedbackOpen} onOpenChange={setFeedbackOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-1.5" />
                    Feedback
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="font-heading">Feedback op landelijke standaard</DialogTitle>
                    <DialogDescription>
                      Geef feedback op de landelijke standaardtekst. Dit wordt doorgestuurd naar de landelijke beheerder.
                    </DialogDescription>
                  </DialogHeader>
                  <Textarea
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="Beschrijf uw feedback op de standaardtekst..."
                    className="min-h-[120px]"
                  />
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setFeedbackOpen(false)}>Annuleren</Button>
                    <Button onClick={handleFeedback}>Verstuur feedback</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>

        <TabsContent value="external" className="mt-4">
          <BlockEditor
            blocks={externalBlocks}
            onUpdateBlock={(id, field, val) => {
              setExternalBlocks(externalBlocks.map((b) => b.id === id ? { ...b, [field]: val } : b));
            }}
            onAddBlock={() => setExternalBlocks([...externalBlocks, { id: `block-${Date.now()}`, header: "", body: "" }])}
            onRemoveBlock={(id) => setExternalBlocks(externalBlocks.filter((b) => b.id !== id))}
            highlights={externalHighlights}
            onRemoveHighlight={(id) => setExternalHighlights(externalHighlights.filter((h) => h.id !== id))}
            tempTexts={externalTempTexts}
            onRemoveTempText={(id) => setExternalTempTexts(externalTempTexts.filter((t) => t.id !== id))}
            label="Externe tekst — voor inwoners"
            icon={<ExternalLink className="h-4 w-4" />}
          />
        </TabsContent>

        <TabsContent value="internal" className="mt-4">
          <BlockEditor
            blocks={internalBlocks}
            onUpdateBlock={(id, field, val) => {
              setInternalBlocks(internalBlocks.map((b) => b.id === id ? { ...b, [field]: val } : b));
            }}
            onAddBlock={() => setInternalBlocks([...internalBlocks, { id: `block-${Date.now()}`, header: "", body: "" }])}
            onRemoveBlock={(id) => setInternalBlocks(internalBlocks.filter((b) => b.id !== id))}
            highlights={internalHighlights}
            onRemoveHighlight={(id) => setInternalHighlights(internalHighlights.filter((h) => h.id !== id))}
            tempTexts={internalTempTexts}
            onRemoveTempText={(id) => setInternalTempTexts(internalTempTexts.filter((t) => t.id !== id))}
            label="Interne tekst — voor medewerkers"
            icon={<Lock className="h-4 w-4" />}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Block editor sub-component
interface BlockEditorProps {
  blocks: ContentBlock[];
  onUpdateBlock: (id: string, field: "header" | "body", value: string) => void;
  onAddBlock: () => void;
  onRemoveBlock: (id: string) => void;
  highlights: HighlightedText[];
  onRemoveHighlight: (id: string) => void;
  tempTexts: TemporaryText[];
  onRemoveTempText: (id: string) => void;
  label: string;
  icon: React.ReactNode;
}

function BlockEditor({
  blocks,
  onUpdateBlock,
  onAddBlock,
  onRemoveBlock,
  highlights,
  onRemoveHighlight,
  tempTexts,
  onRemoveTempText,
  label,
  icon,
}: BlockEditorProps) {
  // Render inline items (highlights + temp texts) at a given position
  const renderInlineItems = (position: number) => {
    const hlItems = highlights.filter((h) => h.position === position);
    const tmpItems = tempTexts.filter((t) => t.position === position);
    if (hlItems.length === 0 && tmpItems.length === 0) return null;

    return (
      <div className="space-y-2">
        {hlItems.map((h) => (
          <div key={h.id} className="flex items-start gap-2 rounded-md border-2 border-accent bg-accent/30 p-3">
            <Highlighter className="h-4 w-4 text-accent-foreground mt-0.5 shrink-0" />
            <p className="text-sm text-accent-foreground flex-1 font-medium">{h.text}</p>
            <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0" onClick={() => onRemoveHighlight(h.id)}>
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        ))}
        {tmpItems.map((t) => (
          <div key={t.id} className="flex items-start gap-2 rounded-md border border-dashed border-warning bg-warning/10 p-3">
            <Clock className="h-4 w-4 text-warning mt-0.5 shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-foreground">{t.text}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {t.visibleFrom} — {t.visibleUntil}
              </p>
            </div>
            <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0" onClick={() => onRemoveTempText(t.id)}>
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-heading flex items-center gap-2">
          {icon}
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {renderInlineItems(0)}

        {blocks.map((block, index) => (
          <div key={block.id}>
            <div className="border border-border rounded-lg p-4 space-y-2 bg-card">
              <div className="flex items-center gap-2">
                <GripVertical className="h-4 w-4 text-muted-foreground shrink-0" />
                <Input
                  value={block.header}
                  onChange={(e) => onUpdateBlock(block.id, "header", e.target.value)}
                  placeholder={`Koptekst (bijv. Inleiding, Aanvraag, Kosten...)`}
                  className="font-heading font-semibold text-sm"
                />
                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 text-destructive" onClick={() => onRemoveBlock(block.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Textarea
                value={block.body}
                onChange={(e) => onUpdateBlock(block.id, "body", e.target.value)}
                placeholder="Voer de tekst in voor dit blok..."
                className="min-h-[100px] font-body text-sm leading-relaxed"
              />
            </div>
            {renderInlineItems(index + 1)}
          </div>
        ))}

        <Button variant="outline" className="w-full border-dashed" onClick={onAddBlock}>
          <Plus className="h-4 w-4 mr-1.5" />
          Blok toevoegen
        </Button>
      </CardContent>
    </Card>
  );
}
