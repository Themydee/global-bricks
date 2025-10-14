import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout.jsx";
import Button from "../components/ui/Button.jsx";

const AuthPage = () => {
  const [tab, setTab] = useState("login"); // 'login' or 'register'
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (tab === "register" && !name) {
      setError("Please enter your name.");
      return;
    }

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    if (tab === "register" && !email.includes("@")) {
      setError("Email must contain '@'.");
      return;
    }

    try {
      const endpoint =
        tab === "login"
          ? "http://localhost:3000/api/users/login"
          : "http://localhost:3000/api/users/register";
      const body =
        tab === "login" ? { email, password } : { name, email, password };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        if (data.user.role === "admin") navigate("/admin");
        else navigate("/projects");
      } else {
        setError(data.message || "Action failed");
      }
    } catch (err) {
      console.error(err);
      setError("Server error, please try again later.");
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
          {/* Tabs */}
          <div className="flex justify-center mb-6">
            <button
              className={`px-4 py-2 ${
                tab === "login"
                  ? "font-bold border-b-2 border-primary"
                  : "text-gray-500"
              }`}
              onClick={() => setTab("login")}
            >
              Login
            </button>
            <button
              className={`px-4 py-2 ${
                tab === "register"
                  ? "font-bold border-b-2 border-primary"
                  : "text-gray-500"
              }`}
              onClick={() => setTab("register")}
            >
              Register
            </button>
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {tab === "register" && (
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 rounded"
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded"
            />
            <Button type="submit" variant="primary">
              {tab === "login" ? "Login" : "Register"}
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AuthPage;
