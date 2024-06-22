import { User } from "@/types";
import { redirect } from "react-router-dom";

export default function loaderProtectRoute(user: User | null) {
  return () => {
    if (!user) {
      return redirect("/signin");
    }
    return null;
  };
}
