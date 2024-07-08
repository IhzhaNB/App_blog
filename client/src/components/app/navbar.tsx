import { useSession } from "@/context/authContext";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { IoAddOutline } from "react-icons/io5";
import { logout } from "@/api/authApi";
import { useToast } from "../ui/use-toast";
import { useMutation } from "@tanstack/react-query";

export default function Navbar() {
  const { user } = useSession();
  const navigate = useNavigate();
  const { toast } = useToast();

  const mutationlogout = useMutation({
    mutationFn: logout,
    onSuccess() {
      setTimeout(() => {
        window.location.reload();
      });
      toast({
        title: "Success",
        description: "logged out successfully",
      });
    },
    onError(e) {
      toast({
        title: "Failed",
        description: e.message,
        variant: "destructive",
      });
    },
  });

  const handleLogout = async () => {
    mutationlogout.mutate();
  };
  return (
    <nav className="bg-white flex border-b-2 border-black p-3 container items-center justify-between">
      <h3
        className="text-2xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        My Blog
      </h3>
      {user ? (
        <div className="flex gap-3">
          <Button
            className="rounded-full border border-b-2 border-r-2 border-black"
            variant={"ghost"}
            onClick={() => navigate("/blog/create")}
          >
            <IoAddOutline className="text-xl" />
          </Button>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      ) : (
        <Button onClick={() => navigate("/signin")}>Sign In</Button>
      )}
    </nav>
  );
}
