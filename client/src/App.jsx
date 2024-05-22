import TaskList from './components/entities/tasks/list'
import { Toaster } from '@/components/ui/sonner'
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
