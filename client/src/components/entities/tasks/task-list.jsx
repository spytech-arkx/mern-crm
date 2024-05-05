// import { z } from "zod"

import { useGetTasksListQuery } from "@/data/api-slice"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { Spinner } from "@/components/ui/spinner"

// async function getTasks() {
//   return z.array(taskSchema).parse(data)
// }

export default function TaskList() {
  const { data, error, isLoading } = useGetTasksListQuery()
  if(isLoading) return (
    <div className="flex-1 flex-col space-y-8 p-8 md:flex">
      <Spinner size="large" />
    </div>
  )

  if(error) console.log(error);

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <DataTable data={data} columns={columns} />
      </div>
    </>
  )
}
