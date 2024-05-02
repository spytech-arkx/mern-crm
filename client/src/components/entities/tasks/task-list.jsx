import { DataTable } from "../../data-table"
import { taskColumns } from "./task-columns"
import { tasks } from "../../../assets/mock-data"

export default function TaskList() {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={taskColumns} data={[...tasks]} />
    </div>
  )
}
