import { createBrowserRouter } from "react-router-dom";
import { About } from "../pages/About";
import { Contact } from "../pages/Contact";
import { UserLayout } from "../layouts/UserLayout";
import { History } from "../pages/History";
import { Offering } from "../pages/Offering";
import { Festival } from "../pages/Festival";
import { Error } from "../components/error/Error";
import Gallery from "../pages/Gallery";
import { Home } from "../pages/Home";
import Pooja from "../pages/Pooja"; 

export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "pooja", element: <Pooja /> }, 
      { path: "festival", element: <Festival /> },
      { path: "history", element: <History /> },
      { path: "contact", element: <Contact /> },
      { path: "offering", element: <Offering /> },
      { path: "gallery", element: <Gallery /> },
    ],
  },
]);
