import { companies } from "@/assets/mock-data";
import { Dash } from "@/components/shared/dashboard";
import Cookies from "js-cookie";

export default function HomePage() {
  const layout = Cookies.get("react-resizable-panels:layout");
  const collapsed = Cookies.get("react-resizable-panels:collapsed");
  const defaultLayout = layout ? JSON.parse(layout) : undefined;
  const defaultCollapsed = ( collapsed !== "undefined" && collapsed) ? JSON.parse(collapsed) : undefined;

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Dash
        companies={companies}
        defaultLayout={defaultLayout}
        defaultCollapsed={defaultCollapsed}
        navCollapsedSize={4}
      />
    </div>
  );
}
