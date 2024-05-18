import TaskList from './components/entities/tasks/list'
import { Toaster } from '@/components/ui/sonner'
import './styles/index.css'
import { TaskFormDrawer } from './components/entities/tasks/form-drawer'

function App() {
  return (
    <div>
    <TaskList />
    <TaskFormDrawer />
    <Toaster />
    </div>
  )
}

export default App
