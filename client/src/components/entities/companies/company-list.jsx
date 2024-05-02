import { DataTable } from "../../data-table"
import { companyColumns } from "./company-columns"
import { companies } from "../../../assets/mock-data"

export default function CompanyList() {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={companyColumns} data={[...companies]} />
    </div>
  )
}