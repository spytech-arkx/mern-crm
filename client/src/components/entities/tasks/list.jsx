// import { z } from "zod"

import { useGetTasksListQuery } from "@/features/api/tasks";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { toast } from "sonner";
import LoadingSekeleton from "../skeleton";

export default function TaskList() {
  const { data: tasks, error, isLoading } = useGetTasksListQuery();

  if (isLoading) {
    return <LoadingSekeleton />
  }

  if (error) {
    console.error(error);
    toast.error("Couldn't load tasks 🤕")
  }

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-6 pt-3 mx-auto md:flex">
      <DataTable data={tasks} columns={columns} />
    </div>
  );
}
