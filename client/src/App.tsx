

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./pages/HomePage";
import RootLayout from "./components/RootLayout";
import CreateTrailPage from "./pages/CreateTrailPage";




const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/create-trail",
        element: <CreateTrailPage />
      }
    ],
  }
]);

const queryClient = new QueryClient();

function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
  );
}

export default App;
