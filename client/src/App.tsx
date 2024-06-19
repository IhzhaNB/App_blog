import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/errorPage/ErrorPage";
import Layout from "./pages/Layout";
import Home from "./pages/home/Home";
import Blog from "./pages/blog/Blog";
import CreateBlog from "./pages/createBlog/CreateBlog";
import Signin from "./pages/signin/Signin";
import Signup from "./pages/signup/Signup";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <ErrorPage />,
      Component: Layout,
      children: [
        { index: true, Component: Home },
        { path: "/blog/:id", Component: Blog },
        { path: "/blog/create", Component: CreateBlog },
        { path: "/signin", Component: Signin },
        { path: "/signup", Component: Signup },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
