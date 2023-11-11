"use client";

import { Link } from "react-router-dom";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { cn } from "@/lib/utils";

import { buttonVariants } from "@/components/ui/button";
import { registerUser } from "@/actions/userActions";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ResetPassword({ className, ...props }) {
  const dispatch = useDispatch();

  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user,
  );

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { email, password } = user;

  async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.set("email", email);
    formData.set("password", password);

    dispatch(registerUser(formData));
  }

  return (
    <div className="lg:p-8">
      <Link
        to="/signin"
        className={cn(
          buttonVariants({ variant: "outline" }),
          "absolute right-4 top-4 md:right-8 md:top-8",
        )}
      >
        Sign in
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Reset Your Password
          </h1>
          <p className="text-muted-foreground text-sm">
            Fear not. We will email you instruction to reset your password.
          </p>
        </div>
        <div className={cn("grid gap-6", className)} {...props}>
          <form onSubmit={onSubmit}>
            <div className="grid gap-2">
              <div className="grid gap-1">
                <Label className="text-md font-bold text-black" htmlFor="email">
                  Email
                </Label>
                <Input
                  required
                  id="email"
                  className="mb-3 text-black"
                  value={email}
                  onChange={(event) =>
                    setUser({ ...user, email: event.target.value })
                  }
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={loading}
                />
              </div>
              <Button disabled={loading}>
                {loading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Reset Password
              </Button>
              {error && (
                <span className="text-pink-600">
                  Request Failed. Please try again later.
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
ResetPassword.propTypes = {
  className: PropTypes.string, // String is optional
};
