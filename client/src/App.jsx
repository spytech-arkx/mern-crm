import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskList from "./components/entities/tasks/task-list";
import Navbar from "./components/shared/Navbar";
import Sidebar from "./components/shared/Sidebar";
import { Grid, GridItem } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import "./styles/index.css";
import Dashboard from "./components/dashboard/Dashboard";
import { useState } from "react";
import KanbanBoard from "./components/dashboard/kanban";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <ChakraProvider>
      <BrowserRouter>
        <Grid
          templateAreas={`"header header"
                    "nav main"
                    "nav footer"`}
          gridTemplateRows={"80px 1fr 30px"}
          gridTemplateColumns={isSidebarOpen ? "250px 1fr" : "60px 1fr"}
          h="200px"
          gap="1"
          color="blackAlpha.700"
          fontWeight="bold">
          <GridItem pl="2" area={"header"}>
            <Navbar />
          </GridItem>
          <GridItem pl="2" area={"nav"}>
            <Sidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
          </GridItem>
          <GridItem pl="2" bg="gray.50" area={"main"}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tasks" element={<TaskList />} />
              <Route path="/kanban" element={<KanbanBoard />} />
            </Routes>
          </GridItem>
          <GridItem pl="2" bg="blue.50" area={"footer"}>
            Footer
          </GridItem>
        </Grid>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
