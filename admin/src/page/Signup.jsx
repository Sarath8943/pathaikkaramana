import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";
import axiosInstance from "../utils/axiosInstance";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ message: "", type: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setFeedback({ message: "", type: "" });

    try {
      const response = await axiosInstance.post("/admin/signup", formData);

      if (response.status === 200 || response.status === 201) {
        setFeedback({
          message: "Registration success! Redirecting...",
          type: "success",
        });

        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      }
    } catch (error) {
      setFeedback({
        message:
          error.response?.data?.message || "Registration failed. Try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "w-full rounded-xl border border-amber-200 bg-amber-50/50 py-3 pr-4 pl-10 outline-none transition-all placeholder:text-amber-400 focus:border-transparent focus:ring-2 focus:ring-amber-600";
  const iconStyle =
    "absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-amber-700";

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-50 p-6">
      <div className="flex w-full max-w-4xl flex-col overflow-hidden rounded-[2.5rem] border border-amber-100 bg-white shadow-2xl md:flex-row">
        <div className="relative flex flex-col justify-between overflow-hidden bg-amber-800 p-10 text-white md:w-2/5">
          <div className="relative z-10">
            <ShieldCheck className="mb-6 h-12 w-12 text-amber-300" />
            <h2 className="text-3xl leading-tight font-bold">
              Admin
              <br />
              Registration
            </h2>
            <p className="mt-4 leading-relaxed font-light text-amber-100/80">
              Create your secure administrator account to start managing the
              platform effectively.
            </p>
          </div>

          <div className="relative z-10 text-sm italic text-amber-200/50">
            Secure Infrastructure v2.0
          </div>

          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-amber-700 opacity-50 blur-3xl" />
        </div>

        <div className="flex-1 bg-white p-10 lg:p-14">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-stone-800">Get Started</h3>
            <p className="text-sm text-stone-500">Fill in the details below</p>
          </div>

          {feedback.message ? (
            <div
              className={`mb-6 rounded-xl border p-4 text-sm font-medium ${
                feedback.type === "success"
                  ? "border-emerald-100 bg-emerald-50 text-emerald-700"
                  : "border-rose-100 bg-rose-50 text-rose-700"
              }`}
            >
              {feedback.message}
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User className={iconStyle} />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                className={inputStyle}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="relative">
                <Mail className={iconStyle} />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  className={inputStyle}
                  onChange={handleChange}
                />
              </div>

              <div className="relative">
                <Phone className={iconStyle} />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  required
                  className={inputStyle}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="relative">
              <Lock className={iconStyle} />
              <input
                type="password"
                name="password"
                placeholder="Strong Password"
                required
                className={inputStyle}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-800 py-4 font-bold text-white shadow-xl shadow-amber-900/10 transition-all hover:bg-amber-900 active:scale-[0.97] disabled:bg-amber-300"
            >
              {loading ? (
                "Processing..."
              ) : (
                <>
                  Registration
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 border-t border-stone-100 pt-6 text-center">
            <p className="text-sm font-medium text-stone-500">
              Already have an admin account?{" "}
              <Link
                to="/login"
                className="font-bold text-amber-700 underline underline-offset-4 transition-colors hover:text-amber-900"
              >
                Log In Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
