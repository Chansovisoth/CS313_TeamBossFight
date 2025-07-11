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
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Add this state
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [registerData, setRegisterData] = useState({
    fullName: "",
    category: "",
    description: "",
    battleTimer: "",
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
      category: "",
      description: "",
      battleTimer: "",
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
            

            {/* ===== FORM SECTION (RIGHT) ===== */}
            <div className="flex-1 bg-white dark:bg-zinc-900 p-8 flex flex-col justify-center">
              <div className="max-w-md mx-auto w-full">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl font-bold mb-2">
                    Create Boss
                  </CardTitle>
                  <CardDescription>
                    Create boss and start the battle
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-0">
                  <form onSubmit={handleRegisterSubmit} className="space-y-4">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <Label htmlFor="register-fullName">Boss Name</Label>
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

                    {/* Category */}
                    <div className="space-y-2">
                      <Label htmlFor="register-category">Category</Label>
                      <div className="relative">
                        <select
                          id="register-category"
                          name="category"
                          value={registerData.category}
                          onChange={handleRegisterChange}
                          className="w-full px-3 py-2 border border-input bg-background rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                          required
                        >
                          <option value="">Select a category</option>
                          <option value="architecture">Architecture</option>
                          <option value="business">Business</option>
                          <option value="civil-engineering">Civil Engineering</option>
                          <option value="computer-science">Computer Science</option>
                          <option value="mis">MIS</option>
                          <option value="action">Life is good</option>
                        </select>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <Label htmlFor="register-description">Description</Label>
                      <div className="relative">
                        <textarea
                          id="register-description"
                          name="description"
                          placeholder="Enter boss description..."
                          value={registerData.description}
                          onChange={handleRegisterChange}
                          className="w-full px-3 py-2 border border-input bg-background rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                          rows={4}
                          required
                        />
                      </div>
                    </div>

                    {/* Battle Timer */}
                    <div className="space-y-2">
                      <Label htmlFor="register-battleTimer">Battle Timer (seconds)</Label>
                      <div className="relative">
                        <Input
                          id="register-battleTimer"
                          name="battleTimer"
                          type="number"
                          placeholder="Enter battle duration"
                          value={registerData.battleTimer}
                          onChange={handleRegisterChange}
                          className="pl-3 pr-12"
                          min="1"
                          max="3600"
                          required
                        />
                        
                      </div>
                    </div>


                    <Button
                      type="submit"
                      variant="outline"
                      className="w-full bg-zinc-900 dark:bg-zinc-750 text-white hover:text-white hover:bg-zinc-800 px-6 py-2 rounded-2 mt-6"
                    >
                      Create Boss
                    </Button>
                    
                  </form>

                  
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
