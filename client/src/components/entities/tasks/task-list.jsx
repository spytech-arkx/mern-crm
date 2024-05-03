// import { z } from "zod"

import { columns } from "./columns"
import { DataTable } from "./data-table"
// import { taskSchema } from "@/data/tasks/schema"
import data from '@/data/tasks/tasks.json'

// Simulate a database read for tasks.
// async function getTasks() {
//   return z.array(taskSchema).parse(data)
// }

export default function TaskList() {

  return (
    <>
      <div className="md:hidden">
        <img
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <img
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          {/* <div className="flex items-center space-x-2">
            <UserNav />
          </div> */}
        </div>
        <DataTable data={data} columns={columns} />
      </div>
    </>
  )
}
