import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Login payload:", formData);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute -left-24 top-16 h-56 w-56 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-8 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl" />

      <section className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-[#262f4a] bg-[#0f1424]/80 shadow-2xl shadow-black/30 backdrop-blur lg:grid-cols-2">
        <div className="flex flex-col justify-between p-6 sm:p-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9ca7c7]">
              NexusAI
            </p>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              Think faster. Find anything.
            </h1>
            <p className="mt-4 max-w-sm text-sm text-[#9ca7c7] sm:text-base">
              A next-generation AI search and reasoning engine. Ask anything,
              get structured, source-backed answers in seconds.
            </p>
          </div>

          <div className="mt-10 hidden rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-[#c7d0ea] lg:block">
            <p className="font-medium">Secure access</p>
            <p className="mt-2 text-[#9ca7c7]">
              Use your account email and password to sign in safely.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center bg-linear-to-br from-white/5 to-transparent p-6 sm:p-10 lg:p-12 mr-5">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md space-y-5"
            noValidate
          >
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[#cfd6ee]"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full rounded-xl border border-[#2b3555] bg-[#0a1020] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-[#cfd6ee]"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                className="w-full rounded-xl border border-[#2b3555] bg-[#0a1020] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-linear-to-r from-cyan-500 to-purple-600 px-4 py-3 text-sm font-semibold text-white transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1424]"
            >
              Sign In
            </button>

            <p className="text-center text-sm text-[#9ca7c7]">
              New here?{" "}
              <Link
                to="/register"
                className="font-semibold text-[#7d9bff] hover:text-[#a8bcff]"
              >
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Login;
