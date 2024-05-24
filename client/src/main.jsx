import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { Toaster } from "./components/ui/sonner.jsx";

import { RouterProvider } from "react-router-dom/dist/index.js";
import { router } from "./routes.jsx";

import { ChakraProvider } from "@chakra-ui/react";
import customTheme from "./lib/theme.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      <Provider store={store}>
        <RouterProvider router={router} />
        <Toaster />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>,
);
