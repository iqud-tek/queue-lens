import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { login } from "@/store/slices/loginSlice";
// import { useLoginMutation } from "@/store/apis/loginAPI";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // remove this state
  // const [loginApi, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((res) => {
      setTimeout(() => {
        res("resolved");
      }, 1000);
    });
    dispatch(login({ email, password }));
    setIsLoading(false);
    navigate("/dashboard");
    // try {
    //   const response = await loginApi({ email, password }).unwrap();
    //   dispatch(login(response)); // Dispatch action to store user data

    //   console.log("Login successful", response);
    // } catch (error) {
    //   console.error("Login failed", error);
    // }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-background text-foreground px-4">
      <div className="w-full max-w-md bg-card border border-border rounded-[var(--radius)] shadow-md p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <Input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Forgot Password */}
          <div className="text-sm text-muted-foreground">
            <button
              type="button"
              className="hover:text-foreground underline focus:outline-none"
              onClick={() => console.log("Forgot Password Clicked")}
            >
              Forgot your password?
            </button>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Logging In" : "Login"}
          </Button>
        </form>

        {/* Don't Have an Account */}
        <div className="text-sm text-muted-foreground">
          <span>Don’t have an account? </span>
          <Link to="/sign-up" className="text-foreground hover:underline">
            Sign up
          </Link>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-between gap-2">
          <div className="h-[2px] w-[200px] bg-muted" />
          <span className="text-muted-foreground">or</span>
          <div className="h-[2px] w-[200px] bg-muted" />
        </div>

        {/* Social Media Buttons */}
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center"
            onClick={() => console.log("Login with Google")}
          >
            <img
              src="https://static-00.iconduck.com/assets.00/google-icon-2048x2048-czn3g8x8.png"
              alt="Google"
              className="h-5 w-5 mr-2"
            />
            Login with Google
          </Button>
          <Button
            variant="outline"
            className="w-full flex items-center justify-center"
            onClick={() => console.log("Login with Facebook")}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
              alt="Facebook"
              className="h-5 w-5 mr-2"
            />
            Login with Facebook
          </Button>
          <Button
            variant="outline"
            className="w-full flex items-center justify-center"
            onClick={() => console.log("Login with GitHub")}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
              alt="GitHub"
              className="h-5 w-5 mr-2"
            />
            Login with GitHub
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
