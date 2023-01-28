import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import "./index.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
])
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
