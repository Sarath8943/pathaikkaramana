import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

const UserLayout = lazy(() =>
  import("../layouts/UserLayout").then((module) => ({
    default: module.UserLayout,
  })),
);
const ErrorPage = lazy(() =>
  import("../components/error/Error").then((module) => ({
    default: module.Error,
  })),
);
const Home = lazy(() => import("../pages/Home"));
const About = lazy(() =>
  import("../pages/About").then((module) => ({
    default: module.About,
  })),
);
const Pooja = lazy(() => import("../pages/Pooja"));
const Festival = lazy(() => import("../pages/Festival"));
const History = lazy(() => import("../pages/History"));
const Contact = lazy(() => import("../pages/Contact"));
const Offering = lazy(() => import("../pages/Offering"));
const Gallery = lazy(() => import("../pages/Gallery"));

const pageLoader = (
  <div className="min-h-[50vh] flex items-center justify-center text-sm text-stone-500">
    Loading...
  </div>
);

const withSuspense = (Component) => (
  <Suspense fallback={pageLoader}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: withSuspense(UserLayout),
    errorElement: withSuspense(ErrorPage),
    children: [
      { index: true, element: withSuspense(Home) },
      { path: "home", element: withSuspense(Home) },
      { path: "about", element: withSuspense(About) },
      { path: "pooja", element: withSuspense(Pooja) },
      { path: "festival", element: withSuspense(Festival) },
      { path: "history", element: withSuspense(History) },
      { path: "contact", element: withSuspense(Contact) },
      { path: "offering", element: withSuspense(Offering) },
      { path: "gallery", element: withSuspense(Gallery) },
    ],
  },
]);
