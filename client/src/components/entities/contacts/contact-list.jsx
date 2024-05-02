import { DataTable } from "../../data-table"
import { contactColumns } from "./contact-columns"
import { contacts } from "../../../assets/mock-data"

export default function ContactList() {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={contactColumns} data={[...contacts]} />
    </div>
  )
}
