import LogInPage from "./pages/auth/login-page.jsx";
import SignUpPage from "./pages/auth/signup-page.jsx";

import GeneralError from "./pages/errors/500.jsx";
import NotFoundError from "./pages/errors/404.jsx";

import TaskList from "./components/entities/tasks/list.jsx";

import { TaskFormDrawer } from "./components/entities/tasks/form-drawer.jsx";
import { TaskForm } from "./components/entities/tasks/form-edit.jsx";
import { TaskForm2 } from "./components/entities/tasks/form-create.jsx";
import { CompaniesList } from "./components/entities/companies/list.jsx";
import { CompanyForm } from "./components/entities/companies/form-create.jsx";
import { CompanyFormEdit } from "./components/entities/companies/form-edit.jsx";

import { createBrowserRouter } from "react-router-dom";
import { AuthenticatedRoute, UnauthenticatedRoute } from "./features/auth/videur.jsx";
import "./styles/index.css";

export const router = createBrowserRouter([
  {
    errorElement: <GeneralError />,
    path: "/login",
    element: (
      <UnauthenticatedRoute>
        <LogInPage />,
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
        <div>
          <TaskList />
          <TaskFormDrawer />
        </div>
      </AuthenticatedRoute>
    ),
    errorElement: <GeneralError />,
  },
  {
    path: "/companies",
    element: (
      <div>
        <CompaniesList />
        <CompanyForm />
      </div>
    ),
    errorElement: <GeneralError />,
  },
  {
    path: "/companies/:id",
    element: (
      <div>
        <CompanyFormEdit />
      </div>
    ),
    errorElement: <GeneralError />,
  },
  {
    path: "*",
    element: <NotFoundError />,
  },
]);
