import { Spinner } from "@/components/ui/spinner";
import { tabs } from "@/data/profile";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";

export default function ProfilePage() {
  const [tab, setTab] = useState(tabs[0]);
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return (
      <div className="flex-1 flex-col space-y-8 p-8 md:flex">
        <Spinner size="large" />
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col p-6 gap-8">
      <div className="max-w-6xl w-full grid gap-1 mx-auto">
        <h1 className="text-2xl font-bold">{tab.title}</h1>
        <p className="text-m font-medium opacity-50 text-muted-foreground">
          {tab.description}
        </p>
      </div>
      <div className="grid items-start max-w-6xl w-full md:grid-cols-[120px_1fr] lg:grid-cols-[160px_1fr] mx-auto">
        <nav className="text-s text-gray-500 grid gap-2">
          {tabs.map((tab) => (
            <NavLink
              key={tab.value}
              to={tab.href}
              end
              onClick={() => setTab(tab)}
              className={({ isActive }) =>
                cn(
                  "hover:text-black hover:font-semibold",
                  isActive ? "text-black font-semibold" : "",
                )
              }>
              {tab.title}
            </NavLink>
          ))}
        </nav>
        <div>
          <Outlet context={user} />
        </div>
      </div>
    </main>
  );
}
