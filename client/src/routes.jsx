import LogInPage from "./pages/login-page.jsx";
import SignUpPage from "./pages/signup-page.jsx";

import GeneralError from "./pages/500.jsx";
import NotFoundError from "./pages/404.jsx";

import TaskList from "./components/entities/tasks/list.jsx";
import { TaskFormDrawer } from "./components/entities/tasks/form-drawer.jsx";
import { TaskForm } from "./components/entities/tasks/form-edit.jsx";
import { TaskForm2 } from "./components/entities/tasks/form-create.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import KanbanBoard from "./components/dashboard/kanban.jsx";
import CompanyDetails from "./components/dashboard/companies/CompanyDetails.jsx";
import CompaniesList from "./components/dashboard/companies/CompaniesList.jsx";

import { createBrowserRouter } from "react-router-dom";
import { AuthenticatedRoute, UnauthenticatedRoute } from "./features/auth/videur.jsx";

import "./styles/index.css";
import Root from "./root.jsx";
import Index from "./components/shared/Index.jsx";
import SettingsProfilePage from "./pages/profile-page.jsx";

export const router = createBrowserRouter([
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
            path: "/tasks/create",
            element: <TaskForm2 />,
          },
          {
            path: "/tasks/edit",
            element: <TaskForm />,
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
