import LogInPage from "./pages/login-page.jsx";
import SignUpPage from "./pages/signup-page.jsx";

import GeneralError from "./pages/500.jsx";
import NotFoundError from "./pages/404.jsx";

import TaskList from "./components/entities/tasks/list.jsx";
import { TaskFormDrawer } from "./components/entities/tasks/form-drawer.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import KanbanBoard from "./components/dashboard/kanban.jsx";
import CompanyDetails from "./components/entities/companies/CompanyDetails.jsx";
import CompaniesList from "./components/entities/companies/CompaniesList.jsx";

import { createBrowserRouter } from "react-router-dom";
import { AuthenticatedRoute, UnauthenticatedRoute } from "./features/auth/videur.jsx";

import "./styles/index.css";
import Root from "./root.jsx";
import Index from "./components/shared/Index.jsx";
import SettingsProfilePage from "./pages/profile-page.jsx";
import ContactsList from "./components/entities/contacts/ContactsList.jsx";
import ContactDetails from "./components/entities/contacts/ContactDetails.jsx";

const routerNT = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthenticatedRoute>
        <Root />
      </AuthenticatedRoute>
    ),
    errorElement: <GeneralError />,
    children: [
      {
        errorElement: <GeneralError />,
        children: [
          { index: true, element: <Index /> },
          {
            path: "/kanban",
            element: (
              <AuthenticatedRoute>
                <KanbanBoard />
              </AuthenticatedRoute>
            ),
          },
          {
            path: "/dashboard",
            element: (
              <AuthenticatedRoute>
                <Dashboard />
              </AuthenticatedRoute>
            ),
          },
          {
            path: "/profile",
            element: (
              <AuthenticatedRoute>
                <SettingsProfilePage />
              </AuthenticatedRoute>
            ),
          },
          {
            path: "/companies",
            element: (
              <AuthenticatedRoute>
                <CompaniesList />
              </AuthenticatedRoute>
            ),
          },
          {
            path: "/companies/:companyId",
            element: (
              <AuthenticatedRoute>
                <CompanyDetails />
              </AuthenticatedRoute>
            ),
          },
          {
            path: "/contacts",
            element: (
              <AuthenticatedRoute>
                <ContactsList />
              </AuthenticatedRoute>
            ),
          },
          {
            path: "/contacts/:contactId",
            element: (
              <AuthenticatedRoute>
                <ContactDetails />
              </AuthenticatedRoute>
            ),
          },
          {
            path: "/users",
            element: (
              <AuthenticatedRoute>
                <Index />
              </AuthenticatedRoute>
            ),
          },
          {
            path: "/contacts",
            element: (
              <AuthenticatedRoute>
                <Index />
              </AuthenticatedRoute>
            ),
          },
          {
            path: "/tasks",
            element: (
              <AuthenticatedRoute>
                <TaskList />
                <TaskFormDrawer />
              </AuthenticatedRoute>
            ),
          },
          {
            path: "/deals",
            element: (
              <AuthenticatedRoute>
                <Index />
              </AuthenticatedRoute>
            ),
          },
          {
            path: "/archive",
            element: (
              <AuthenticatedRoute>
                <Index />
              </AuthenticatedRoute>
            ),
          },
          {
            path: "/analytics",
            element: (
              <AuthenticatedRoute>
                <Index />
              </AuthenticatedRoute>
            ),
          },
          {
            path: "/integrations",
            element: (
              <AuthenticatedRoute>
                <Index />
              </AuthenticatedRoute>
            ),
          },
          {
            path: "*",
            element: <NotFoundError />,
          },
        ],
      },
    ],
  },
  {
    errorElement: <GeneralError />,
    path: "/login",
    element: (
      <UnauthenticatedRoute>
        <LogInPage />
      </UnauthenticatedRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <UnauthenticatedRoute>
        <SignUpPage />
      </UnauthenticatedRoute>
    ),
    errorElement: <GeneralError />,
  },
  {
    path: "*",
    element: <NotFoundError />,
  },
]);

export default routerNT;
