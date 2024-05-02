import { DataTable } from "../../../components/data-table"
import { contactColumns } from "../../../components/columns"
import { contacts } from "../../../assets/mock-data"

export default function ContactList() {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={contactColumns} data={[...contacts, ...contacts]} />
    </div>
  )
}
