export type SyncStatus = "synced" | "outdated" | "draft" | "not-published";

export interface HighlightedText {
  id: string;
  text: string;
  position: number; // index in blocks where it appears (0 = before first block, 1 = after first block, etc.)
}

export interface TemporaryText {
  id: string;
  text: string;
  visibleFrom: string;
  visibleUntil: string;
  position: number;
}

export interface ContentBlock {
  id: string;
  header: string;
  body: string;
}

export interface StandardSection {
  id: string;
  header: string;
  body: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  standardSections: StandardSection[];
  externalBlocks: ContentBlock[];
  internalBlocks: ContentBlock[];
  highlightedTexts: { external: HighlightedText[]; internal: HighlightedText[] };
  temporaryTexts: { external: TemporaryText[]; internal: TemporaryText[] };
  externalSyncStatus: SyncStatus;
  internalSyncStatus: SyncStatus;
  lastEdited: string;
  lastPublished: string | null;
  isLandelijk: boolean;
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
    standardSections: [
      { id: "std-001-1", header: "Inleiding", body: "Een paspoort is een reisdocument waarmee u zich kunt identificeren en waarmee u kunt reizen naar landen buiten de Europese Unie." },
      { id: "std-001-2", header: "Aanvraag", body: "U kunt een paspoort aanvragen bij de gemeente waar u staat ingeschreven. Neem een geldig identiteitsbewijs en een recente pasfoto mee." },
      { id: "std-001-3", header: "Kosten", body: "De kosten voor een paspoort bedragen maximaal €75,80 voor personen van 18 jaar en ouder, en maximaal €53,05 voor personen jonger dan 18 jaar." },
      { id: "std-001-4", header: "Voorwaarden", body: "U moet ingeschreven staan in de Basisregistratie Personen (BRP). U moet persoonlijk verschijnen bij de aanvraag." },
    ],
    externalBlocks: [
      { id: "ext-001-1", header: "Inleiding", body: "Een paspoort is een reisdocument waarmee u zich kunt identificeren. U kunt een paspoort aanvragen bij onze gemeente." },
      { id: "ext-001-2", header: "Aanvraag", body: "Maak een afspraak via onze website. Neem een geldig identiteitsbewijs en een recente pasfoto mee." },
      { id: "ext-001-3", header: "Kosten", body: "De kosten bedragen €75,80 voor personen van 18 jaar en ouder." },
    ],
    internalBlocks: [
      { id: "int-001-1", header: "Inleiding", body: "Procedure paspoortaanvraag voor baliemedewerkers." },
      { id: "int-001-2", header: "Aanvraag", body: "1. Burger maakt afspraak via het afsprakensysteem\n2. Controleer identiteit aan de balie\n3. Neem vingerafdrukken en pasfoto af\n4. Aanvraag invoeren in RAAS\n5. Levertijd: 5 werkdagen" },
      { id: "int-001-3", header: "Kosten", body: "De kosten voor een paspoort bedragen €92,00 voor personen van 18 jaar en ouder, en €53,05 voor personen jonger dan 18 jaar." },
      { id: "int-001-4", header: "Voorwaarden", body: "Burger moet ingeschreven staan in de BRP. Persoonlijk verschijnen is verplicht." },
    ],
    highlightedTexts: {
      external: [],
      internal: [{ id: "hl-001-1", text: "Let op: bij spoedaanvraag gelden afwijkende kosten en levertijden.", position: 2 }],
    },
    temporaryTexts: {
      external: [{ id: "tmp-001-1", text: "Vanwege drukte adviseren wij u ruim van tevoren een afspraak te maken.", visibleFrom: "2026-03-01", visibleUntil: "2026-04-30", position: 1 }],
      internal: [],
    },
    externalSyncStatus: "synced",
    internalSyncStatus: "outdated",
    lastEdited: "2026-03-01",
    lastPublished: "2026-03-01",
    isLandelijk: true,
  },
  {
    id: "prod-002",
    name: "Rijbewijs aanvragen",
    category: "Burgerzaken",
    standardSections: [
      { id: "std-002-1", header: "Inleiding", body: "Na het behalen van uw rijexamen kunt u een rijbewijs aanvragen bij uw gemeente." },
      { id: "std-002-2", header: "Aanvraag", body: "U heeft hiervoor een geldig identiteitsbewijs en een recente pasfoto nodig. Indien van toepassing ook een gezondheidsverklaring." },
      { id: "std-002-3", header: "Kosten", body: "De kosten voor een rijbewijs bedragen maximaal €41,35." },
    ],
    externalBlocks: [
      { id: "ext-002-1", header: "Inleiding", body: "Na het behalen van uw rijexamen kunt u bij ons een rijbewijs aanvragen." },
      { id: "ext-002-2", header: "Aanvraag", body: "Maak hiervoor een afspraak. Neem mee: geldig ID, pasfoto, gezondheidsverklaring (indien van toepassing)." },
      { id: "ext-002-3", header: "Kosten", body: "Kosten: €41,35." },
    ],
    internalBlocks: [
      { id: "int-002-1", header: "Inleiding", body: "Rijbewijsaanvraag verwerken voor baliemedewerkers." },
      { id: "int-002-2", header: "Procedure", body: "1. Controleer of aanvrager geslaagd is (RDW check)\n2. Controleer identiteitsbewijs\n3. Verwerk aanvraag in RDW-systeem\n4. Rijbewijs is na 5 werkdagen op te halen" },
      { id: "int-002-3", header: "Kosten", body: "De kosten voor een rijbewijs bedragen €41,35." },
    ],
    highlightedTexts: { external: [], internal: [] },
    temporaryTexts: { external: [], internal: [] },
    externalSyncStatus: "outdated",
    internalSyncStatus: "synced",
    lastEdited: "2026-02-28",
    lastPublished: "2026-02-15",
    isLandelijk: true,
  },
  {
    id: "prod-003",
    name: "Omgevingsvergunning",
    category: "Bouwen & Wonen",
    standardSections: [
      { id: "std-003-1", header: "Inleiding", body: "Voor het bouwen, verbouwen of slopen heeft u mogelijk een omgevingsvergunning nodig." },
      { id: "std-003-2", header: "Wanneer nodig", body: "Dit geldt ook voor het kappen van bomen, het aanleggen van een uitrit of het wijzigen van een monument." },
      { id: "std-003-3", header: "Procedure", body: "De beslistermijn is 8 weken voor reguliere aanvragen en 26 weken voor uitgebreide aanvragen." },
    ],
    externalBlocks: [
      { id: "ext-003-1", header: "Inleiding", body: "Wilt u (ver)bouwen, slopen, of een boom kappen? Controleer eerst via het Omgevingsloket of u een vergunning nodig heeft." },
      { id: "ext-003-2", header: "Aanvraag", body: "U kunt de aanvraag digitaal indienen via het Omgevingsloket." },
    ],
    internalBlocks: [
      { id: "int-003-1", header: "Inleiding", body: "Omgevingsvergunning behandeling voor medewerkers." },
      { id: "int-003-2", header: "Procedure", body: "1. Aanvraag binnengekomen via Omgevingsloket\n2. Ontvangstbevestiging sturen (binnen 3 dagen)\n3. Toets aan bestemmingsplan en welstandseisen\n4. Beslistermijn: 8 weken (regulier) of 26 weken (uitgebreid)" },
    ],
    highlightedTexts: { external: [], internal: [] },
    temporaryTexts: { external: [], internal: [] },
    externalSyncStatus: "synced",
    internalSyncStatus: "outdated",
    lastEdited: "2026-02-20",
    lastPublished: "2026-02-20",
    isLandelijk: false,
  },
  {
    id: "prod-004",
    name: "Bijstandsuitkering",
    category: "Werk & Inkomen",
    standardSections: [
      { id: "std-004-1", header: "Inleiding", body: "Als u niet genoeg inkomen heeft om van te leven en geen recht heeft op een andere uitkering, kunt u een bijstandsuitkering aanvragen bij uw gemeente." },
      { id: "std-004-2", header: "Voorwaarden", body: "U moet 18 jaar of ouder zijn, in Nederland wonen en onvoldoende inkomen of vermogen hebben." },
    ],
    externalBlocks: [],
    internalBlocks: [],
    highlightedTexts: { external: [], internal: [] },
    temporaryTexts: { external: [], internal: [] },
    externalSyncStatus: "draft",
    internalSyncStatus: "draft",
    lastEdited: "2026-03-04",
    lastPublished: null,
    isLandelijk: true,
  },
  {
    id: "prod-005",
    name: "WMO-voorziening aanvragen",
    category: "Zorg & Welzijn",
    standardSections: [
      { id: "std-005-1", header: "Inleiding", body: "De Wet maatschappelijke ondersteuning (Wmo) regelt hulp en ondersteuning voor mensen die dat nodig hebben." },
      { id: "std-005-2", header: "Voorzieningen", body: "Denk aan hulp bij het huishouden, een rolstoel of aanpassing van uw woning." },
      { id: "std-005-3", header: "Aanvraag", body: "Neem contact op met het Sociaal Team voor een keukentafelgesprek. De gemeente beslist binnen 8 weken." },
    ],
    externalBlocks: [
      { id: "ext-005-1", header: "Inleiding", body: "Heeft u hulp nodig bij het huishouden, vervoer of woningaanpassing?" },
      { id: "ext-005-2", header: "Aanvraag", body: "Neem contact op met het Sociaal Team voor een gesprek over uw situatie en mogelijkheden." },
    ],
    internalBlocks: [
      { id: "int-005-1", header: "Inleiding", body: "WMO-aanvraag proces voor medewerkers." },
      { id: "int-005-2", header: "Procedure", body: "1. Melding via Sociaal Team of balie\n2. Keukentafelgesprek plannen (binnen 6 weken)\n3. Onderzoek en beoordeling\n4. Beschikking versturen\n5. Voorziening regelen via gecontracteerde aanbieder" },
    ],
    highlightedTexts: { external: [], internal: [] },
    temporaryTexts: { external: [], internal: [] },
    externalSyncStatus: "not-published",
    internalSyncStatus: "synced",
    lastEdited: "2026-02-10",
    lastPublished: null,
    isLandelijk: false,
  },
];
