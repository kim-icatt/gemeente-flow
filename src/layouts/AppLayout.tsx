import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { MunicipalitySelector } from "@/components/MunicipalitySelector";
import { useState } from "react";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  const [municipality, setMunicipality] = useState("gem-001");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center justify-between border-b px-4 bg-card">
            <SidebarTrigger />
            <MunicipalitySelector
              value={municipality}
              onChange={setMunicipality}
            />
          </header>
          <main className="flex-1 p-6 lg:p-8 max-w-6xl">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
