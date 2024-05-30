import { ProfileForm } from "@/components/profile/profile-form";
import Index from "@/components/shared/Index";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tabs } from "@/data/profile";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function SettingsProfilePage() {
  const [tab, setTab] = useState(tabs[0]);
  const { user } = useSelector(state => state.auth);

  if(!user) {
      return (
        <div className="flex-1 flex-col space-y-8 p-8 md:flex">
          <Spinner size="large" />
        </div>
      );
  }
  
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
        <TabsContent value="profile"><ProfileForm user={user} /></TabsContent>
        <TabsContent value="preferences"><Index /></TabsContent>
        <TabsContent value="security"><Index /></TabsContent>
        <TabsContent value="data"><Index /></TabsContent>
        <TabsContent value="socials"><Index /></TabsContent>
      </Tabs>
    </div>
  );
}
