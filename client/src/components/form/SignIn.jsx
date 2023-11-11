"use client";

import { Link, useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { cn } from "@/lib/utils";

import { buttonVariants } from "@/components/ui/button";
import { loginUser } from "@/actions/userActions";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignIn({ className, ...props }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const { loading, isAuthenticated, error } = useSelector( (state) => state.user,);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  async function onSubmit(event) {
    event.preventDefault();
    await dispatch(loginUser(user.email, user.password));
    if (isAuthenticated && user.email===import.meta.env.VITE_ADMIN_EMAIL) navigate("/admin/manage-orders")
    else if (isAuthenticated) navigate("/");
  }

  return (
    <div className="lg:p-8">
      <Link
        to="/signup"
        className={cn(
          buttonVariants({ variant: "outline" }),
          "absolute right-4 top-4 md:right-8 md:top-8",
        )}
      >
        Sign up
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
        <div className="flex flex-col space-y-2 text-center">
          <p className="text-muted-foreground text-sm">SIGN IN</p>
          <h1 className="text-2xl font-semibold tracking-tight">
            Good to see you again!
          </h1>
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
                  value={user.email}
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
                <div className="relative">
                  <Label
                    className="text-md font-bold text-black"
                    htmlFor="password"
                  >
                    Set a Password
                  </Label>
                  <Input
                    required
                    className="mb-3 text-black"
                    value={user.password}
                    onChange={(event) =>
                      setUser({ ...user, password: event.target.value })
                    }
                    id="password"
                    placeholder="verystrongpassword"
                    type={passwordVisible ? "text" : "password"}
                    autoCapitalize="none"
                    autoComplete="new-password"
                    autoCorrect="off"
                    disabled={loading}
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setPasswordVisible(!passwordVisible);
                    }}
                    role="button"
                    className="absolute bottom-5 right-3"
                  >
                    <svg
                      className="h-6 w-6 "
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      stroke="black"
                      fill="none"
                    >
                      {passwordVisible ? (
                        <>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </>
                      ) : (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      )}
                    </svg>
                  </button>
                </div>
              </div>
              <Button type="submit" disabled={loading}>
                {loading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign In with Email
              </Button>
              {error && (
                <span className="text-pink-600">
                  Sign In Failed. {error}
                </span>
              )}
            </div>
          </form>
          {/* <div className="relative"> */}
          {/*   <div className="absolute inset-0 flex items-center"> */}
          {/*     <span className="w-full border-t" /> */}
          {/*   </div> */}
          {/*   <div className="relative flex justify-center text-xs uppercase"> */}
          {/*     <span className="bg-background text-muted-foreground px-2"> */}
          {/*       Or continue with */}
          {/*     </span> */}
          {/*   </div> */}
          {/* </div> */}
          {/* <Button variant="outline" type="button" disabled={loading}> */}
          {/*   {loading ? ( */}
          {/*     <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> */}
          {/*   ) : ( */}
          {/*     <Icons.google className="mr-2 h-4 w-4" /> */}
          {/*   )} */}
          {/*   Google */}
          {/* </Button> */}
        </div>
        <p className="text-muted-foreground px-8 text-center text-sm">
          Your personal data will be used to support your experience throughout
          this website, to manage access to your account, and for other purposes
          described in our&nbsp;
          <Link
            to="/privacy-policy"
            className="hover:text-primary underline underline-offset-4"
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
SignIn.propTypes = {
  className: PropTypes.string, // String is optional
};
