"use client";
import { useAuth } from "@/stores/user";
import { useState, useEffect } from "react";
import { Loader2, LogIn, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const login = useAuth((s) => s.login);
  const navigate = useNavigate();

  useEffect(() => {
    const checkExistingAuth = () => {
      try {
        const authUser = localStorage.getItem("authUser");
        if (authUser) {
          const userData = JSON.parse(authUser);
          if (userData && userData.token) {
            console.log("[Auth] Found existing auth, navigating to app");
            navigate("/app/home");
            return;
          }
        }
      } catch (err) {
        console.error("[Auth] Error checking existing auth:", err);
      }
    };

    checkExistingAuth();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email.trim()) {
      setError("Email is required");
      setLoading(false);
      return;
    }

    if (!password.trim()) {
      setError("Password is required");
      setLoading(false);
      return;
    }

    try {
      console.log("[Auth] Attempting login with:", email);

      const response = await axios.get(
        "http://26.7.188.28:3551/api/launcher/login",
        {
          params: {
            email: email.trim(),
            password: password,
          },
        }
      );

      if (response.status === 200 && response.data.username) {
        const userData = {
          email: email.trim(),
          username: response.data.username,
          password: password,
          accountId: response.data.accountId,
        };

        login(userData);
        console.log("[Auth] Login successful, navigating to app");
        navigate("/app/home");
      }
    } catch (err: any) {
      console.error("[Auth] Login failed:", err);

      if (err.response?.status === 404) {
        setError("User not found. Please check your email.");
      } else if (err.response?.status === 400) {
        setError("Invalid password. Please try again.");
      } else if (err.response?.data) {
        setError(err.response.data);
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center relative overflow-hidden">
      <div className="relative z-10 flex flex-col items-center space-y-8 p-8">
        <div className="text-center space-y-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-[#e0e7ff] to-[#c7d2fe] bg-clip-text text-transparent">
              Welcome to Orbit
            </h1>
            <p className="text-[#b9bbbe] text-lg font-medium">
              Sign in to your account
            </p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
          {/* Email Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-[#72767d]" />
            </div>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="w-full pl-10 pr-4 py-3 bg-[#2f3136] border border-[#40444b] rounded-lg text-white placeholder-[#72767d] focus:outline-none focus:ring-2 focus:ring-[#5865F2] focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-[#72767d]" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="w-full pl-10 pr-12 py-3 bg-[#2f3136] border border-[#40444b] rounded-lg text-white placeholder-[#72767d] focus:outline-none focus:ring-2 focus:ring-[#5865F2] focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={loading}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#72767d] hover:text-white transition-colors duration-200 disabled:opacity-50"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-400 text-sm text-center bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          {/* Login Button */}
          <div className="relative pt-2">
            <button
              type="submit"
              disabled={loading}
              className={`relative cursor-pointer group flex items-center gap-3 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 w-full justify-center
                ${
                  loading
                    ? "bg-[#4752c4] cursor-not-allowed"
                    : "bg-gradient-to-r from-[#5865F2] to-[#7289da] hover:from-[#4752c4] hover:to-[#677bc4] shadow-lg shadow-[#5865F2]/25 hover:shadow-xl hover:shadow-[#5865F2]/40"
                }`}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#5865F2] to-[#7289da] rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>

              <div className="relative flex items-center gap-3">
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="text-lg">Signing in...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
                    <span className="text-lg">Sign In</span>
                  </>
                )}
              </div>
            </button>
          </div>
        </form>

        <p className="text-[#72767d] text-sm text-center max-w-sm leading-relaxed">
          Need help? Join our{" "}
          <a
            className="transition-all duration-200 hover:underline hover:text-blue-400 cursor-pointer"
            onClick={() => window.open("https://discord.gg/xCADAAAw")}
          >
            Discord Server.
          </a>
        </p>
      </div>
    </div>
  );
}
