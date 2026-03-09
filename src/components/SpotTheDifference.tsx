import { StandardSection, ContentBlock } from "@/data/mockProducts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, AlertTriangle, CheckCircle2 } from "lucide-react";

interface Mismatch {
  sectionHeader: string;
  standardText: string;
  internalText: string;
  issues: string[];
}

function detectMismatches(
  standardSections: StandardSection[],
  internalBlocks: ContentBlock[]
): { mismatches: Mismatch[]; matchedCount: number; missingSections: string[] } {
  const mismatches: Mismatch[] = [];
  const missingSections: string[] = [];
  let matchedCount = 0;

  for (const section of standardSections) {
    // Find matching internal block by header (case-insensitive)
    const matchingBlock = internalBlocks.find(
      (b) => b.header.toLowerCase().trim() === section.header.toLowerCase().trim()
    );

    if (!matchingBlock) {
      missingSections.push(section.header);
      continue;
    }

    const issues = findIssues(section.body, matchingBlock.body);
    if (issues.length > 0) {
      mismatches.push({
        sectionHeader: section.header,
        standardText: section.body,
        internalText: matchingBlock.body,
        issues,
      });
    } else {
      matchedCount++;
    }
  }

  return { mismatches, matchedCount, missingSections };
}

function findIssues(standard: string, internal: string): string[] {
  const issues: string[] = [];

  // Extract amounts (€XX,XX or €XX)
  const amountRegex = /€\s*[\d.,]+/g;
  const standardAmounts = standard.match(amountRegex) || [];
  const internalAmounts = internal.match(amountRegex) || [];

  for (const stdAmount of standardAmounts) {
    const stdVal = parseAmount(stdAmount);
    let found = false;
    for (const intAmount of internalAmounts) {
      const intVal = parseAmount(intAmount);
      if (Math.abs(stdVal - intVal) < 0.01) {
        found = true;
        break;
      }
    }
    if (!found) {
      // Check if there's a different amount
      const closestInt = internalAmounts.find(() => true);
      if (closestInt) {
        issues.push(`Bedrag verschilt: standaard vermeldt "${stdAmount}", intern staat "${closestInt}"`);
      } else {
        issues.push(`Bedrag "${stdAmount}" uit de standaard ontbreekt in de interne tekst`);
      }
    }
  }

  // Extract numbers (durations, counts) - look for patterns like "X weken", "X dagen", "X jaar"
  const durationRegex = /(\d+)\s*(weken|dagen|werkdagen|maanden|jaar)/gi;
  const stdDurations = [...standard.matchAll(durationRegex)];
  const intDurations = [...internal.matchAll(durationRegex)];

  for (const stdDur of stdDurations) {
    const stdNum = stdDur[1];
    const stdUnit = stdDur[2].toLowerCase();
    const matchingInt = intDurations.find(
      (d) => d[2].toLowerCase() === stdUnit
    );
    if (matchingInt && matchingInt[1] !== stdNum) {
      issues.push(`Termijn verschilt: standaard "${stdDur[0]}", intern "${matchingInt[0]}"`);
    }
  }

  // General text divergence check - if texts share very few words
  const stdWords = new Set(standard.toLowerCase().split(/\s+/).filter(w => w.length > 4));
  const intWords = new Set(internal.toLowerCase().split(/\s+/).filter(w => w.length > 4));
  const overlap = [...stdWords].filter(w => intWords.has(w)).length;
  const similarity = stdWords.size > 0 ? overlap / stdWords.size : 1;
  
  if (similarity < 0.15 && issues.length === 0) {
    issues.push("De interne tekst wijkt sterk af van de landelijke standaard");
  }

  return issues;
}

function parseAmount(str: string): number {
  return parseFloat(str.replace("€", "").replace(/\s/g, "").replace(",", "."));
}

interface SpotTheDifferenceProps {
  standardSections: StandardSection[];
  internalBlocks: ContentBlock[];
  onClose: () => void;
}

export function SpotTheDifference({ standardSections, internalBlocks, onClose }: SpotTheDifferenceProps) {
  const { mismatches, matchedCount, missingSections } = detectMismatches(standardSections, internalBlocks);
  const totalIssues = mismatches.length + missingSections.length;

  return (
    <Card className="border-2 border-primary/20 bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-heading flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-warning" />
            Vergelijking met landelijke standaard
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-3 mt-2">
          {totalIssues > 0 ? (
            <Badge variant="destructive" className="text-xs">
              {totalIssues} {totalIssues === 1 ? "afwijking" : "afwijkingen"} gevonden
            </Badge>
          ) : (
            <Badge className="bg-success text-success-foreground text-xs">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Alles komt overeen
            </Badge>
          )}
          {matchedCount > 0 && (
            <span className="text-xs text-muted-foreground">{matchedCount} secties komen overeen</span>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {missingSections.map((section) => (
          <div key={section} className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-foreground">Sectie "{section}" ontbreekt</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Deze sectie staat in de landelijke standaard maar ontbreekt in de interne versie.
                </p>
              </div>
            </div>
          </div>
        ))}

        {mismatches.map((m, idx) => (
          <div key={idx} className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
            <p className="text-sm font-semibold text-foreground mb-2">Sectie: {m.sectionHeader}</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Landelijke standaard</p>
                <p className="text-sm text-foreground bg-background/50 rounded p-2">{m.standardText}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Interne versie</p>
                <p className="text-sm text-foreground bg-background/50 rounded p-2">
                  {highlightDifferences(m.internalText, m.issues)}
                </p>
              </div>
            </div>
            <div className="mt-2 space-y-1">
              {m.issues.map((issue, i) => (
                <div key={i} className="flex items-start gap-1.5">
                  <span className="text-destructive text-xs font-bold mt-0.5">⚠</span>
                  <p className="text-xs text-destructive font-medium">{issue}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {totalIssues === 0 && internalBlocks.length > 0 && (
          <p className="text-sm text-muted-foreground text-center py-2">
            De interne beschrijving komt overeen met de landelijke standaard.
          </p>
        )}

        {internalBlocks.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-2">
            Er zijn nog geen interne blokken om te vergelijken. Importeer eerst de standaardtekst.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function highlightDifferences(text: string, issues: string[]): React.ReactNode {
  // Highlight amounts that are mentioned in issues
  const amountRegex = /€\s*[\d.,]+/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  const hasAmountIssue = issues.some(i => i.includes("Bedrag"));

  if (hasAmountIssue) {
    let match;
    while ((match = amountRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }
      parts.push(
        <span key={match.index} className="bg-destructive/20 text-destructive font-semibold px-1 rounded">
          {match[0]}
        </span>
      );
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }
    return <>{parts}</>;
  }

  return text;
}
