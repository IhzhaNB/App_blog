import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { FormEventHandler, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { login } from "@/api/authApi";
import { useToast } from "@/components/ui/use-toast";

export default function Signup() {
  const [isShow, setIsShow] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (e) => {
      navigate("/");
      toast({
        title: "Success",
        description: e.message,
      });
    },
    onError: (e) => {
      toast({
        title: "Failed",
        description: e.message,
        variant: "destructive",
      });
    },
  });

  const loginHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    };

    const user = {
      username: target.username.value,
      password: target.password.value,
    };

    mutation.mutate(user);
  };

  const dirrectToGoogleSignIn = () =>
    window.location.replace("http://localhost:3000/auth/google");

  return (
    <section className="container">
      <article className="max-w-xl mx-auto p-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Sign In Now and Start Creating with Your Blog
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-3" onSubmit={loginHandler}>
              <Input placeholder="Username" name="username" />
              <div className="relative cursor-pointer">
                <Input
                  name="password"
                  placeholder="Password"
                  type={`${isShow ? "text" : "password"}`}
                />
                <span
                  className="absolute right-3 top-3"
                  onClick={() => setIsShow(!isShow)}
                >
                  {isShow ? <FaRegEye /> : <FaRegEyeSlash />}
                </span>
              </div>
              <Button className="w-full" type="submit">
                {mutation.isPending ? "Loading..." : "Sign In"}
              </Button>
            </form>
            <p className="text-center my-3">Or</p>
            <Button
              variant={"outline"}
              className="w-full"
              onClick={dirrectToGoogleSignIn}
            >
              <FcGoogle className="text-2xl mr-3" />
              Sign In With Google
            </Button>
          </CardContent>
          <CardFooter>
            <p className="mx-auto">
              Do Not Have An Account?{" "}
              <Link className="text-blue-600" to="/signup">
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </article>
    </section>
  );
}
