import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { municipalities } from "@/data/mockProducts";
import { Building2 } from "lucide-react";

interface MunicipalitySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function MunicipalitySelector({ value, onChange }: MunicipalitySelectorProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[220px] bg-card">
        <Building2 className="h-4 w-4 mr-2 text-muted-foreground" />
        <SelectValue placeholder="Selecteer gemeente" />
      </SelectTrigger>
      <SelectContent>
        {municipalities.map((m) => (
          <SelectItem key={m.id} value={m.id}>
            {m.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
