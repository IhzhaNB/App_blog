import { User } from "@/types";
import { redirect } from "react-router-dom";

export default function loaderPreventHasUser(user: User | null) {
  return () => {
    if (user) {
      return redirect("/");
    }
    return null;
  };
}
