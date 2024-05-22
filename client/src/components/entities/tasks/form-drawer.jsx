import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { toggleTaskDrawer } from "@/features/tasks/slice";
import { useDispatch, useSelector } from "react-redux";
import { TaskForm } from "./form-edit";
import { TaskForm2 } from "./form-create";

export function TaskFormDrawer() {
  const openDrawer = useSelector((state) => state.tasks.drawer);
  const id = useSelector((state) => state.tasks.id);
  const dispatch = useDispatch();

  const handleOpenChange = (isOpen) => {
    if (isOpen !== openDrawer) {
      dispatch(toggleTaskDrawer());
    }
  };

  return (
    <Drawer direction="right" open={openDrawer} onOpenChange={handleOpenChange}>
      <div className="border-none">
        <DrawerContent className="w-max h-screen ml-auto border-none">
          {id ? <TaskForm taskId={id} /> : <TaskForm2 />}
        </DrawerContent>
      </div>
    </Drawer>
  );
}
