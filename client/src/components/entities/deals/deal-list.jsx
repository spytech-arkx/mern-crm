import { DataTable } from "../../data-table"
import { dealColumns } from "./deal-columns"
import { deals } from "../../../assets/mock-data"

export default function DealList() {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={dealColumns} data={[...deals]} />
    </div>
  )
}