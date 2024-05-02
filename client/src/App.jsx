import CompanyList from './components/entities/companies/company-list'
import ContactList from './components/entities/contacts/contact-list'
import DealList from './components/entities/deals/deal-list'
import TaskList from './components/entities/tasks/task-list'
import './styles/index.css'

function App() {
  return (
    <>
    <ContactList />
    <TaskList />
    <DealList />
    <CompanyList />
    </>
  )
}

export default App
