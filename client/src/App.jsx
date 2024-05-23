import Navbar from "./components/shared/Navbar";
import Sidebar from "./components/shared/Sidebar";
import { ChakraProvider, Grid, GridItem } from "@chakra-ui/react";
import Footer from "./components/shared/Footer";

import LogInPage from "./pages/auth/login-page.jsx";
import SignUpPage from "./pages/auth/signup-page.jsx";

import GeneralError from "./pages/errors/500.jsx";
import NotFoundError from "./pages/errors/404.jsx";

import TaskList from "./components/entities/tasks/list.jsx";
import { TaskFormDrawer } from "./components/entities/tasks/form-drawer.jsx";
import { TaskForm } from "./components/entities/tasks/form-edit.jsx";
import { TaskForm2 } from "./components/entities/tasks/form-create.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import KanbanBoard from "./components/dashboard/kanban.jsx";
import ProfilePage from "./components/profile/ProfilePage.jsx";
import CompanyDetails from "./components/dashboard/companies/CompanyDetails.jsx";
import CompaniesList from "./components/dashboard/companies/CompaniesList.jsx";

import { BrowserRouter, Route, Routes } from "react-router-dom/dist";
import { useState } from "react";

import "./styles/index.css";
import customTheme from "./lib/theme";
import { AuthenticatedRoute, UnauthenticatedRoute } from "./features/auth/videur";

export default function App() {
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
            <GridItem area={"main"}>
              <Routes>
                <Route
                  path="/profile"
                  element={
                    <AuthenticatedRoute>
                      <ProfilePage />
                    </AuthenticatedRoute>
                  }
                  errorElement={<GeneralError />}
                />
                <Route
                  path="/kanban"
                  element={
                    <AuthenticatedRoute>
                      <KanbanBoard />
                    </AuthenticatedRoute>
                  }
                  errorElement={<GeneralError />}
                />
                <Route
                  path="/dashboard"
                  element={
                    <AuthenticatedRoute>
                      <Dashboard />
                    </AuthenticatedRoute>
                  }
                  errorElement={<GeneralError />}
                />
                <Route
                  path="/login"
                  element={
                    <UnauthenticatedRoute>
                      <LogInPage />
                    </UnauthenticatedRoute>
                  }
                  errorElement={<GeneralError />}
                />
                <Route
                  path="/signup"
                  element={
                    <UnauthenticatedRoute>
                      <SignUpPage />
                    </UnauthenticatedRoute>
                  }
                  errorElement={<GeneralError />}
                />
                <Route
                  path="/tasks/create"
                  element={<TaskForm2 />}
                  errorElement={<GeneralError />}
                />
                <Route
                  path="/tasks/edit"
                  element={<TaskForm />}
                  errorElement={<GeneralError />}
                />
                <Route
                  path="/tasks"
                  element={
                    <AuthenticatedRoute>
                      <TaskList />
                      <TaskFormDrawer />
                    </AuthenticatedRoute>
                  }
                  errorElement={<GeneralError />}
                />
                <Route
                  path="/companies"
                  element={
                    <AuthenticatedRoute>
                      <CompaniesList />
                    </AuthenticatedRoute>
                  }
                  errorElement={<GeneralError />}
                />
                <Route
                  path="/companies/:companyId"
                  element={
                    <AuthenticatedRoute>
                      <CompanyDetails />
                    </AuthenticatedRoute>
                  }
                  errorElement={<GeneralError />}
                />
                <Route path="*" element={<NotFoundError />} />
              </Routes>
            </GridItem>
            <GridItem bg="RGBA(0, 0, 0, 0.02)" area={"footer"}>
              <Footer />
            </GridItem>
          </Grid>
        </div>
      </BrowserRouter>
    </ChakraProvider>
  );
}
