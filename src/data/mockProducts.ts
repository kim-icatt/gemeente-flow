export type SyncStatus = "synced" | "outdated" | "draft" | "not-published";

export interface Product {
  id: string;
  name: string;
  category: string;
  externalContent: string;
  internalContent: string;
  standardText: string;
  externalSyncStatus: SyncStatus;
  internalSyncStatus: SyncStatus;
  lastEdited: string;
  lastPublished: string | null;
}

export const categories = [
  "Burgerzaken",
  "Bouwen & Wonen",
  "Belastingen",
  "Werk & Inkomen",
  "Zorg & Welzijn",
  "Verkeer & Vervoer",
];

export const municipalities = [
  { id: "gem-001", name: "Gemeente Utrecht" },
  { id: "gem-002", name: "Gemeente Amsterdam" },
  { id: "gem-003", name: "Gemeente Rotterdam" },
  { id: "gem-004", name: "Gemeente Den Haag" },
];

export const mockProducts: Product[] = [
  {
    id: "prod-001",
    name: "Paspoort aanvragen",
    category: "Burgerzaken",
    standardText:
      "Een paspoort is een reisdocument waarmee u zich kunt identificeren en waarmee u kunt reizen naar landen buiten de Europese Unie. U kunt een paspoort aanvragen bij de gemeente waar u staat ingeschreven.",
    externalContent:
      "Een paspoort is een reisdocument waarmee u zich kunt identificeren. U kunt een paspoort aanvragen bij onze gemeente. Neem hiervoor een afspraak via onze website. Kosten: €75,80 (voor personen van 18 jaar en ouder).",
    internalContent:
      "Procedure paspoortaanvraag:\n1. Burger maakt afspraak via het afsprakensysteem\n2. Controleer identiteit aan de balie (huidige ID meenemen)\n3. Neem vingerafdrukken en pasfoto af\n4. Aanvraag invoeren in RAAS\n5. Levertijd: 5 werkdagen",
    externalSyncStatus: "synced",
    internalSyncStatus: "synced",
    lastEdited: "2026-03-01",
    lastPublished: "2026-03-01",
  },
  {
    id: "prod-002",
    name: "Rijbewijs aanvragen",
    category: "Burgerzaken",
    standardText:
      "Na het behalen van uw rijexamen kunt u een rijbewijs aanvragen bij uw gemeente. U heeft hiervoor een geldig identiteitsbewijs en een recente pasfoto nodig.",
    externalContent:
      "Na het behalen van uw rijexamen kunt u bij ons een rijbewijs aanvragen. Maak hiervoor een afspraak. Neem mee: geldig ID, pasfoto, gezondheidsverklaring (indien van toepassing). Kosten: €41,35.",
    internalContent:
      "Rijbewijsaanvraag verwerken:\n1. Controleer of aanvrager geslaagd is (RDW check)\n2. Controleer identiteitsbewijs\n3. Verwerk aanvraag in RDW-systeem\n4. Rijbewijs is na 5 werkdagen op te halen",
    externalSyncStatus: "outdated",
    internalSyncStatus: "synced",
    lastEdited: "2026-02-28",
    lastPublished: "2026-02-15",
  },
  {
    id: "prod-003",
    name: "Omgevingsvergunning",
    category: "Bouwen & Wonen",
    standardText:
      "Voor het bouwen, verbouwen of slopen heeft u mogelijk een omgevingsvergunning nodig. Dit geldt ook voor het kappen van bomen, het aanleggen van een uitrit of het wijzigen van een monument.",
    externalContent:
      "Wilt u (ver)bouwen, slopen, of een boom kappen? Controleer eerst via het Omgevingsloket of u een vergunning nodig heeft. U kunt de aanvraag digitaal indienen.",
    internalContent:
      "Omgevingsvergunning behandeling:\n1. Aanvraag binnengekomen via Omgevingsloket\n2. Ontvangstbevestiging sturen (binnen 3 dagen)\n3. Toets aan bestemmingsplan en welstandseisen\n4. Beslistermijn: 8 weken (regulier) of 26 weken (uitgebreid)",
    externalSyncStatus: "synced",
    internalSyncStatus: "outdated",
    lastEdited: "2026-02-20",
    lastPublished: "2026-02-20",
  },
  {
    id: "prod-004",
    name: "Bijstandsuitkering",
    category: "Werk & Inkomen",
    standardText:
      "Als u niet genoeg inkomen heeft om van te leven en geen recht heeft op een andere uitkering, kunt u een bijstandsuitkering aanvragen bij uw gemeente.",
    externalContent: "",
    internalContent: "",
    externalSyncStatus: "draft",
    internalSyncStatus: "draft",
    lastEdited: "2026-03-04",
    lastPublished: null,
  },
  {
    id: "prod-005",
    name: "WMO-voorziening aanvragen",
    category: "Zorg & Welzijn",
    standardText:
      "De Wet maatschappelijke ondersteuning (Wmo) regelt hulp en ondersteuning voor mensen die dat nodig hebben. Denk aan hulp bij het huishouden, een rolstoel of aanpassing van uw woning.",
    externalContent:
      "Heeft u hulp nodig bij het huishouden, vervoer of woningaanpassing? Neem contact op met het Sociaal Team voor een gesprek over uw situatie en mogelijkheden.",
    internalContent:
      "WMO-aanvraag proces:\n1. Melding via Sociaal Team of balie\n2. Keukentafelgesprek plannen (binnen 6 weken)\n3. Onderzoek en beoordeling\n4. Beschikking versturen\n5. Voorziening regelen via gecontracteerde aanbieder",
    externalSyncStatus: "not-published",
    internalSyncStatus: "synced",
    lastEdited: "2026-02-10",
    lastPublished: null,
  },
];
