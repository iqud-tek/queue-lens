import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const SignUpPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Handle sign-up logic here
    console.log("Name:", name, "Email:", email, "Password:", password);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-foreground">
      <div className="w-full max-w-md space-y-6 rounded-[var(--radius)] border border-border bg-card p-6 shadow-md">
        <h1 className="text-center text-2xl font-semibold">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <Input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1"
              required
            />
          </div>

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
              className="mt-1"
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
              className="mt-1"
              required
            />
          </div>

          {/* Confirm Password Field */}
          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium"
            >
              Confirm Password
            </label>
            <Input
              type="password"
              id="confirm-password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1"
              required
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
        {/* Already Have an Account */}
        <div className="text-sm text-muted-foreground">
          <span>Already have an account? </span>
          <Link to="/login" className="text-foreground hover:underline">
            Sign in
          </Link>
        </div>
        {/* Divider */}
        <div className="flex items-center justify-between gap-2">
          <div className="h-[2px] w-[200px] bg-muted" />
          <span className="text-muted-foreground">or</span>
          <div className="h-[2px] w-[200px] bg-muted" />
        </div>
        {/* Social Media Signup Buttons */}
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => console.log("Sign up with Google")}
          >
            <img
              src="https://static-00.iconduck.com/assets.00/google-icon-2048x2048-czn3g8x8.png"
              alt="Google"
              className="mr-2 h-5 w-5"
            />
            Sign up with Google
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => console.log("Sign up with Facebook")}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
              alt="Facebook"
              className="mr-2 h-5 w-5"
            />
            Sign up with Facebook
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => console.log("Sign up with GitHub")}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
              alt="GitHub"
              className="mr-2 h-5 w-5"
            />
            Sign up with GitHub
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
