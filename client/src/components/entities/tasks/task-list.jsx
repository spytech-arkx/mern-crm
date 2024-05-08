// import { z } from "zod"

import { useGetTasksListQuery } from "@/features/api/api-slice"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { Spinner } from "@/components/ui/spinner"
import { useDispatch } from "react-redux"
import { addTasks } from "@/features/tasks/tasks-slice"
import { useEffect } from "react"

// async function getTasks() {
//   return z.array(taskSchema).parse(data)
// }
export default function TaskList() {
  const { data: tasks, error, isLoading } = useGetTasksListQuery();
  const dispatch = useDispatch();
  
  useEffect(() => {
    function populateState() {
      if (tasks) { // Check if data exists before dispatching
       dispatch(addTasks(tasks));
      }
    }
    populateState();
  }, [dispatch, tasks, error, isLoading]);

  if (isLoading) {
    return (
      <div className="flex-1 flex-col space-y-8 p-8 md:flex">
        <Spinner size="large" />
      </div>
    );
  }

  if (error) {
    console.log(error);
  }

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <DataTable data={tasks} columns={columns} />
    </div>
  );
}
