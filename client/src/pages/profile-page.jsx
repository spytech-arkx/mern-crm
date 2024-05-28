import { ProfileForm } from "@/components/profile/profile-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tabs } from "@/data/profile";
import { useState } from "react";

export default function SettingsProfilePage() {
  const [tab, setTab] = useState(tabs[0]);
  return (
    <div className="p-6">
      <div className="flex flex-col gap-1 py-3">
        <h2 className="text-2xl font-bold">{tab.title}</h2>
        <p className="text-m font-medium opacity-50 text-muted-foreground">
          {tab.description}
        </p>
      </div>
      <Tabs defaultValue="profile" className="w-max">
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              onClick={() => {
                setTab(tab);
              }}>
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="profile"><ProfileForm /></TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
}
