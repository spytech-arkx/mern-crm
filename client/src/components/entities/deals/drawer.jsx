import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useDispatch, useSelector } from "react-redux";
import { toggleDealDrawer } from "@/features/deals/slice";
import ViewDealForm from "./form-edit";

export function DealDrawer() {
  const openDrawer = useSelector((state) => state.deals.drawer);
  const deal = useSelector((state) => state.deals.deal);
  const dispatch = useDispatch();

  const handleOpenChange = (isOpen) => {
    if (isOpen !== openDrawer) {
      dispatch(toggleDealDrawer());
    }
  };

  return (
    <Drawer direction="right" open={openDrawer} onOpenChange={handleOpenChange}>
        <DrawerContent className="w-max h-full ml-auto border-none overflow-y-auto overflow-x-hidden">
          {deal ? <ViewDealForm deal={deal} /> : "Hello"}
        </DrawerContent>
    </Drawer>
  );
}
