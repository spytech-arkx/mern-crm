"use client";

import * as React from "react";
import {
  Archive,
  Blocks,
  Building,
  ClipboardCheck,
  GanttChart,
  Handshake,
  Search,
  TrendingUp,
  UserRound,
  Users2,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
// import { CompanySwitcher } from "./company-switch";
import { Nav } from "./nav-bar";
import Cookies from "js-cookie";
import { Outlet } from "react-router-dom";

export function Dash({
  //   companies,
  defaultLayout = [265, 440, 655],
  defaultCollapsed = false,
  navCollapsedSize,
}) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes) => {
          Cookies.set("react-resizable-panels:layout", JSON.stringify(sizes));
        }}
        className="min-h-screen w-full flex-col bg-muted/40 items-stretch">
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={16}
          maxSize={20}
          onExpand={() => {
            setIsCollapsed(false);
            Cookies.set("react-resizable-panels:layout", JSON.stringify(false));
          }}
          onCollapse={() => {
            setIsCollapsed(true);
            Cookies.set("react-resizable-panels:layout", JSON.stringify(true));
          }}
          className={cn(
            isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out",
          )}>
          <div
            className={cn(
              "flex h-[52px] items-center justify-center",
              isCollapsed ? "h-[52px]" : "px-2",
            )}>
            <div
              className={cn(
                "relative z-20 flex items-center text-normal font-bold gap-1",
                "bg-gradient-to-bl from-gray-900 to-lime-30 bg-clip-text text-transparent",
              )}>
              {isCollapsed ? "💼" : "snazCRM 💼"}
            </div>
          </div>
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Overview",
                label: "",
                href: "/overview",
                icon: GanttChart,
                variant: "default",
              },
              {
                title: "Companies",
                label: "2",
                href: "/companies",
                icon: Building,
                variant: "ghost",
              },
              {
                title: "Staff",
                label: "1",
                href: "/users",
                icon: UserRound,
                variant: "ghost",
              },
            ]}
          />
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Contacts",
                label: "12",
                href: "/contacts",
                icon: Users2,
                variant: "ghost",
              },
              {
                title: "Tasks",
                label: "2",
                href: "/tasks",
                icon: ClipboardCheck,
                variant: "ghost",
              },
              {
                title: "Deals",
                label: "12",
                href: "/deals",
                icon: Handshake,
                variant: "ghost",
              },
              {
                title: "Archive",
                label: "21",
                href: "/archive",
                icon: Archive,
                variant: "ghost",
              },
            ]}
          />
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Analytics",
                label: "",
                href: "/analytics",
                icon: TrendingUp,
                variant: "ghost",
              },
              {
                title: "Integrations",
                label: "",
                href: "/integrations",
                icon: Blocks,
                variant: "ghost",
              },
            ]}
          />
        </ResizablePanel>
        <ResizableHandle withHandle/>
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <div className="flex justify-between items-center px-4 py-2">
            <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <form>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search" className="pl-8" />
                </div>
              </form>
            </div>
            <h1 className="font-bold">Hola.</h1>
            {/* TODO: Search, Profile. */}
          </div>
          <Separator />
          <Outlet />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
