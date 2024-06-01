import { NavLink } from "react-router-dom";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function Nav({ links, isCollapsed }) {
  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2">
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) =>
        isCollapsed ? (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <div>
                  <NavLink
                    to={link.href}
                    className={({ isActive }) => {
                    return cn(
                      buttonVariants({ variant: isActive ? "default" : "ghost", size: "icon" }),
                      isActive && "bg-[#393e3f] dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                      )}}>
                    <link.icon className="h-4 w-4" />
                    <span className="sr-only">{link.title}</span>
                  </NavLink>
                </div>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {link.title}
                {/* {link.label && (
                  <span className="ml-auto text-muted-foreground">{link.label}</span>
                )} */}
              </TooltipContent>
            </Tooltip>
          ) : (
            <NavLink
              key={index}
              to={link.href}
              className={({ isActive }) => {
                return cn(
                buttonVariants({ variant: isActive ? "default" : "ghost", size: "sm" }),
                isActive && "bg-[#393e3f] dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                "justify-start",
              )}}>
              <link.icon className="mr-2 h-4 w-4" />
              {link.title}
            </NavLink>
          ),
        )}
      </nav>
    </div>
  );
}
