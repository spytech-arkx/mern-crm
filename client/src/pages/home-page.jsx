import { companies } from "@/assets/mock-data";
import { Dash } from "@/components/shared/dashboard";
import { Spinner } from "@/components/ui/spinner";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

export default function HomePage() {
  const { user } = useSelector((state) => state.auth);
  const layout = Cookies.get("react-resizable-panels:layout");
  const collapsed = Cookies.get("react-resizable-panels:collapsed");
  const defaultLayout = layout ? JSON.parse(layout) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed) : undefined;

  if (!user) {
    return (
      <div className="flex-1 flex-col space-y-8 p-8 md:flex">
        <Spinner size="large" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Dash
        user={user}
        companies={companies}
        defaultLayout={defaultLayout}
        defaultCollapsed={defaultCollapsed}
        navCollapsedSize={3}
      />
    </div>
  );
}
