import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/errorPage/ErrorPage";
import Layout from "./pages/Layout";
import Home from "./pages/home/Home";
import Blog from "./pages/blog/Blog";
import CreateBlog from "./pages/createBlog/CreateBlog";
import Signin from "./pages/signin/Signin";
import Signup from "./pages/signup/Signup";
import { useSession } from "./context/authContext";
import loaderPreventHasUser from "./loader/loaderPreventHasUser";
import loaderProtectRoute from "./loader/loaderProtectRoute";

function App() {
  const { user } = useSession();

  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <ErrorPage />,
      Component: Layout,
      children: [
        { index: true, Component: Home },
        { path: "/blog/:id", Component: Blog },
        {
          path: "/blog/create",
          Component: CreateBlog,
          loader: loaderProtectRoute(user),
        },
        {
          path: "/signin",
          Component: Signin,
          loader: loaderPreventHasUser(user),
        },
        {
          path: "/signup",
          Component: Signup,
          loader: loaderPreventHasUser(user),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
