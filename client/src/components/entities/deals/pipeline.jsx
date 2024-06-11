import { Button } from "@/components/ui/button";
import { stages } from "@/data/deals";

import { cn } from "@/lib/utils";
import { useState } from "react";

const ProgressBar = ({ field, setValue }) => {
  const [currentId, setCurrentId] = useState(
    stages.find((stage) => stage.value === field.value)?.id,
  );
  return (
    <div className="grid grid-cols-7 mx-auto border rounded-full gap-[1px]">
      {stages.map((stage) => (
        <Button
          key={stage.id}
          variant="ghost"
          type="button"
          onClick={() => {
            setCurrentId(stage.id)
            setValue("stage", stage.value)}
          }
          className={cn(
            "text-[12px] font-medium h-8 mx-0 my-0 px-5 rounded-none",
            stage.id <= currentId && stage.styleWhenCompleted,
            stage.id < currentId && "opacity-80",
          )}>
          {stage.label}
        </Button>
      ))}
    </div>
  );
};

export default ProgressBar;
