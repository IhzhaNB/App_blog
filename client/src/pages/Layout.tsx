import Navbar from "@/components/app/navbar";
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Toaster />
    </div>
  );
}
