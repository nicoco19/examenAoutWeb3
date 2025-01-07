import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "components/HomePage/HomePage.jsx";
import AppLoader from "components/App/AppLoader.jsx";
import Books from "components/Books/Books.jsx";
import AddBook from "components/AddBook/AddBook.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLoader />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path:"books",
        element:<Books/>,
      },
      {
        path:"addBooks",
        element:<AddBook />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
);
