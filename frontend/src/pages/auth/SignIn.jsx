import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { http } from "../../api/http"; 


const initialState = {
  email: "",
  password: "",
};

export const SignIn = ({loginToggle, setLoginToggle}) => {
  /**Login Data */
  const [formData, setFormData] = useState(initialState);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChangeLogin = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await http.post("/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      console.log(response.data);

      const { user, token } = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      await Swal.fire({
        title: "Welcome!",
        text: "Login successful",
        icon: "success",
      });

      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Login failed";

      await Swal.fire({
        title: "Login failed",
        text: message,
        icon: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1.5">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChangeLogin}
            placeholder="you@example.com"
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-charcoal placeholder:text-gray-300 focus:outline-none focus:border-charcoal transition-colors"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-charcoal">
              Password
            </label>
            <button
              type="button"
              className="text-xs text-coral hover:underline">
              Forgot password?
            </button>
          </div>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChangeLogin}
            placeholder="Enter your password"
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-charcoal placeholder:text-gray-300 focus:outline-none focus:border-charcoal transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-coral text-white text-sm font-semibold py-3.5 rounded-xl hover:bg-coral/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {loginToggle ? "Sign In" : "Create Account"}{" "}
          <i className="ri-arrow-right-line"></i>
        </button>
        <p className="text-center text-sm text-medium-gray mt-4">
          Don't have an account?
          <button
            type="button"
            onClick={() => setLoginToggle(!loginToggle)}
            className="text-coral font-medium hover:underline"
          >
            {loginToggle ? " Create one" : " Sign in"}
          </button>
        </p>
      </form>
    </>
  );
};
