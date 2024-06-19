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
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { register } from "@/api/authApi";
import { useToast } from "@/components/ui/use-toast";

export default function Signup() {
  const [isShow, setIsShow] = useState(false);
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: register,
    onSuccess: (e) => {
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

  const registerHandler: FormEventHandler<HTMLFormElement> = (e) => {
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

  return (
    <section className="container">
      <article className="max-w-xl mx-auto p-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Sign Up</CardTitle>
            <CardDescription className="text-center">
              Sign Up Now and Start Creating with Your Blog
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-3" onSubmit={registerHandler}>
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
                {mutation.isPending ? "Loading..." : "Sign Up"}
              </Button>
            </form>
            <p className="text-center my-3">Or</p>
            <Button variant={"outline"} className="w-full">
              <FcGoogle className="text-2xl mr-3" />
              Sign In With Google
            </Button>
          </CardContent>
          <CardFooter>
            <p className="mx-auto">
              Already Have an Account?{" "}
              <Link className="text-blue-600" to="/signin">
                Sign In
              </Link>
            </p>
          </CardFooter>
        </Card>
      </article>
    </section>
  );
}
