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
import customTheme from "@/lib/theme";
import ProfilePage from "./components/profile/ProfilePage";
import Footer from "./components/shared/Footer";
import CompaniesList from "./components/dashboard/companies/CompaniesList";
import CompanyDetails from "./components/dashboard/companies/CompanyDetails";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <ChakraProvider theme={customTheme}>
      <BrowserRouter>
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <Grid
            templateAreas={`"nav header"
                    "nav main"
                    "nav footer"`}
            gridTemplateRows={"100px auto 60px"}
            gridTemplateColumns={isSidebarOpen ? "250px 1fr" : "60px 1fr"}
            gap="1"
            color="blackAlpha.700">
            <GridItem
              p="2"
              pos="relative"
              bg="RGBA(0, 0, 0, 0.02)"
              w="100%"
              ml={1}
              mt={2}
              area={"header"}>
              <Navbar />
            </GridItem>
            <GridItem
              pl="2"
              ml={1}
              bg="RGBA(0, 0, 0, 0.02)"
              position="fixed"
              area={"nav"}>
              <Sidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
            </GridItem>
            <GridItem pl="4" ml={2} bg="#F7FAFC" area={"main"}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/tasks" element={<TaskList />} />
                <Route path="/kanban" element={<KanbanBoard />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/companies" element={<CompaniesList />} />
                <Route path="/companies/:companyId" element={<CompanyDetails />} />
              </Routes>
            </GridItem>
            <GridItem pl="4" ml={2} bg="RGBA(0, 0, 0, 0.02)" area={"footer"}>
              <Footer />
            </GridItem>
          </Grid>
        </div>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
