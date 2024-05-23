import LogInPage from "./pages/auth/login-page.jsx";
import SignUpPage from "./pages/auth/signup-page.jsx";

import GeneralError from "./pages/errors/500.jsx";
import NotFoundError from "./pages/errors/404.jsx";


import TaskList from "./components/entities/tasks/list.jsx";
import { TaskFormDrawer } from "./components/entities/tasks/form-drawer.jsx";
import { TaskForm } from "./components/entities/tasks/form-edit.jsx";
import { TaskForm2 } from "./components/entities/tasks/form-create.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";

import { createBrowserRouter } from "react-router-dom";
import { AuthenticatedRoute, UnauthenticatedRoute } from "./features/auth/videur.jsx";
import "./styles/index.css";
import KanbanBoard from "./components/dashboard/kanban.jsx";
import ProfilePage from "./components/profile/ProfilePage.jsx";
import CompanyDetails from "./components/dashboard/companies/CompanyDetails.jsx";
import CompaniesList from "./components/dashboard/companies/CompaniesList.jsx";

export const router = createBrowserRouter([
  {
    errorElement: <GeneralError />,
    path: "/profile",
    element: (
      <AuthenticatedRoute>
        <ProfilePage />
      </AuthenticatedRoute>
    ),
  },
  {
    errorElement: <GeneralError />,
    path: "/kanban",
    element: (
      <AuthenticatedRoute>
        <KanbanBoard />
      </AuthenticatedRoute>
    ),
  },
  {
    errorElement: <GeneralError />,
    path: "/dashboard",
    element: (
      <AuthenticatedRoute>
        <Dashboard />
      </AuthenticatedRoute>
    ),
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
    path: "/tasks/create",
    element: <TaskForm2 />,
    errorElement: <GeneralError />,
  },
  {
    path: "/tasks/edit",
    element: <TaskForm />,
    errorElement: <GeneralError />,
  },
  {
    path: "/tasks",
    element: (
      <AuthenticatedRoute>
          <TaskList />
          <TaskFormDrawer />
      </AuthenticatedRoute>
    ),
    errorElement: <GeneralError />,
  },
  {
    path: "/companies",
    element: (
      <AuthenticatedRoute>
        <CompaniesList />
      </AuthenticatedRoute>
    ),
    errorElement: <GeneralError />,
  },
  {
    path: "/companies/:companyId",
    element: (
      <AuthenticatedRoute>
        <CompanyDetails />
      </AuthenticatedRoute>
    ),
    errorElement: <GeneralError />,
  },
  {
    path: "*",
    element: <NotFoundError />,
  },
]);
