// ===== LIBRARIES ===== //
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";

// ===== COMPONENTS ===== //
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// ===== CONTEXTS ===== //
// import { useAuth } from "@/context/useAuth";  // Commented out for static version
// import { apiClient } from "../api";           // Commented out for static version



const Authentication = () => {
  // const { login } = useAuth();  // Commented out for static version

  const [isSignIn, setIsSignIn] = useState(false); // State to toggle between forms
  const [isClosing, setIsClosing] = useState(false); // State to track when form is closing
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Add this state
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");
  const navigate = useNavigate();

  // Function to handle form transitions with animation
  const handleFormTransition = (newSignInState) => {
    setIsClosing(true);
    setTimeout(() => {
      setIsSignIn(newSignInState);
      setIsClosing(false);
    }, 180); // Match this with your CSS animation duration
  };

  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    // ===== COMMENTED OUT FOR STATIC VERSION =====
    // try {
    //   const response = await apiClient.post("auth/register", {
    //     fullname: registerData.fullName,
    //     email: registerData.email,
    //     password: registerData.password,
    //   })
    //   setMessage(response.data.message || "Account created! You can now sign in.");
    //   setMessageType("success");
    //   handleFormTransition(true);
    //   setRegisterData({
    //     fullName: "",
    //     email: "",
    //     password: "",
    //     confirmPassword: "",
    //   });
    // } catch (err) {
    //   setMessage(err.response?.data?.detail ?? "Signup failed");
    //   setMessageType("error");
    // }

    // Static message for demo purposes
    setMessage("Account created! You can now sign in. (Static Demo)");
    setMessageType("success");
    handleFormTransition(true);
    setRegisterData({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    // const formData = new URLSearchParams();
    // formData.append("username", loginData.email);
    // formData.append("password", loginData.password);

    // ===== COMMENTED OUT FOR STATIC VERSION =====
    // try {
    //   const response = await apiClient.post("auth/login", formData, {
    //     headers: {
    //       'Content-Type': 'application/x-www-form-urlencoded',
    //     }
    //   });
    //   
    //   login({
    //     accessToken: response.data.access_token,
    //     user: response.data.user
    //   });
    //   
    //   apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
    //   
    //   setMessage("Login successful!");
    //   setMessageType("success");
    //   navigate("/");
    // } catch (err) {
    //   console.error("Login error:", err);
    //   setMessage(err.response?.data?.detail ?? "Login failed");
    //   setMessageType("error");
    // }

    // Static message for demo purposes
    setMessage("Login successful! (Static Demo)");
    setMessageType("success");
    // Simulate navigation delay
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <main className="flex-grow px-4 pb-6 sm:px-12 md:px-20 lg:px-20 xl:px-50 2xl:px-80 flex items-center justify-center min-h-[calc(100vh-200px)]">
      {/* Message */}
      {message && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-4 rounded-md shadow-lg transition-all duration-300 ${
            messageType === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          <div className="flex items-center justify-between">
            <span>{message}</span>
            <button
              className="ml-4 text-xl text-gray-500 hover:text-gray-700"
              onClick={() => setMessage("")}
            >
              &times;
            </button>
          </div>
        </div>
      )}
      <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-center gap-8">
        {/* ===== REGISTER CARD ===== */}
        {!isSignIn && (
          <Card
            className={`flex flex-col md:flex-row overflow-hidden min-h-[600px] mt-2 g-lg-0 py-0 gap-0 ${
              isClosing
                ? "animated-fadeOut-down-fast"
                : "animated-fadeIn-down-fast"
            }`}
          >
            {/* ===== BANNER SECTION (LEFT) ===== */}
            <div className="flex-1 bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 p-8 flex flex-col justify-center text-white relative">
              {/* Decorative Elements */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400 rounded-full transform rotate-45"></div>
                <div className="absolute top-40 right-20 w-16 h-4 bg-orange-400 rounded-full transform rotate-12"></div>
                <div className="absolute bottom-32 left-16 w-24 h-6 bg-pink-400 rounded-full transform -rotate-12"></div>
                <div className="absolute bottom-20 right-10 w-18 h-5 bg-yellow-300 rounded-full transform rotate-45"></div>
              </div>

              <div className="relative z-10 p-2 lg:p-8">
                <h1 className="text-4xl font-bold mb-4">
                  Welcome to BallotPilot
                </h1>
                <p className="text-lg opacity-90 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                  aliquam erat volutpat.
                </p>
              </div>
            </div>

            {/* ===== FORM SECTION (RIGHT) ===== */}
            <div className="flex-1 bg-white dark:bg-zinc-900 p-8 flex flex-col justify-center">
              <div className="max-w-md mx-auto w-full">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl font-bold mb-2">
                    Create Account
                  </CardTitle>
                  <CardDescription>
                    Sign up to start voting and creating polls
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-0">
                  <form onSubmit={handleRegisterSubmit} className="space-y-4">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <Label htmlFor="register-fullName">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          id="register-fullName"
                          name="fullName"
                          type="text"
                          placeholder="Enter your full name"
                          value={registerData.fullName}
                          onChange={handleRegisterChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          id="register-email"
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          value={registerData.email}
                          onChange={handleRegisterChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          id="register-password"
                          name="password"
                          type={showRegisterPassword ? "text" : "password"}
                          placeholder="Create a password"
                          value={registerData.password}
                          onChange={handleRegisterChange}
                          className="pl-10 pr-10"
                          required
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowRegisterPassword(!showRegisterPassword)
                          }
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showRegisterPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2">
                      <Label htmlFor="register-confirmPassword">
                        Confirm Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          id="register-confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          value={registerData.confirmPassword}
                          onChange={handleRegisterChange}
                          className="pl-10 pr-10"
                          required
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      variant="outline"
                      className="w-full bg-zinc-900 dark:bg-zinc-750 text-white hover:text-white hover:bg-zinc-800 px-6 py-2 rounded-2 mt-6"
                    >
                      Create Account
                    </Button>
                  </form>

                  <div className="mt-6 text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <span
                      className="text-primary cursor-pointer hover:underline"
                      onClick={() => handleFormTransition(true)}
                    >
                      Sign in
                    </span>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        )}

        {/* ===== LOGIN CARD ===== */}
        {isSignIn && (
          <Card
            className={`flex flex-col md:flex-row overflow-hidden min-h-[600px] py-0 gap-0 ${
              isClosing
                ? "animated-fadeOut-down-fast"
                : "animated-fadeIn-down-fast"
            }`}
          >
            {/* ===== BANNER SECTION (LEFT) ===== */}
            <div className="flex-1 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 p-8 flex flex-col justify-center text-white relative">
              {/* Decorative Elements */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-20 left-10 w-20 h-20 bg-cyan-400 rounded-full transform rotate-45"></div>
                <div className="absolute top-40 right-20 w-16 h-4 bg-blue-400 rounded-full transform rotate-12"></div>
                <div className="absolute bottom-32 left-16 w-24 h-6 bg-indigo-400 rounded-full transform -rotate-12"></div>
                <div className="absolute bottom-20 right-10 w-18 h-5 bg-cyan-300 rounded-full transform rotate-45"></div>
              </div>

              <div className="relative z-10 p-2 lg:p-8">
                <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
                <p className="text-lg opacity-90 leading-relaxed">
                  Good to see you again! Sign in to your account to continue
                  voting and managing your polls with BallotPilot.
                </p>
              </div>
            </div>

            {/* ===== FORM SECTION (RIGHT) ===== */}
            <div className="flex-1 bg-white dark:bg-zinc-900 p-8 flex flex-col justify-center">
              <div className="max-w-md mx-auto w-full">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl font-bold">
                    Welcome Back
                  </CardTitle>
                  <CardDescription>
                    Sign in to your account to continue voting
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-0">
                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          id="login-email"
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          value={loginData.email}
                          onChange={handleLoginChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          id="login-password"
                          name="password"
                          type={showLoginPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={loginData.password}
                          onChange={handleLoginChange}
                          className="pl-10 pr-10"
                          required
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowLoginPassword(!showLoginPassword)
                          }
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showLoginPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Forgot Password */}
                    {/* <div className="text-right">
                      <span className="text-sm text-primary cursor-pointer hover:underline">
                        Forgot password?
                      </span>
                    </div> */}

                    <Button
                      type="submit"
                      variant="outline"
                      className="w-full bg-zinc-900 dark:bg-zinc-750 text-white hover:text-white hover:bg-zinc-800 px-6 py-2 rounded-2 mt-6"
                    >
                      Sign In
                    </Button>
                  </form>

                  <div className="mt-6 text-center text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <span
                      className="text-primary cursor-pointer hover:underline"
                      onClick={() => handleFormTransition(false)}
                    >
                      Create account
                    </span>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        )}
      </div>
    </main>
  );
};

export default Authentication;
