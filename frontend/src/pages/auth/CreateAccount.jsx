import { useState } from "react";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import { http } from "../../api/http"; // adjust path to match your actual folder structure

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const CreateAccount = ({loginToggle, setLoginToggle}) => {
  /** Create Account Data */
  const [formData, setFormData] = useState(
    initialState,
  );

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  /** Validation Logic */
  const handleValidate = (name, value) =>{
    switch(name){
    case 'firstName':
      if(!value.trim()){
        return 'First name is required';
      }
      if(value.length < 3){
        return 'First name must be at least 3 characters';
      }
      return '';

     case 'lastName':
      if(!value.trim()){
        return 'Last name is required';
      }
      if(value.length < 3){
        return 'Last name must be at least 3 characters';
      }
      return '';
   
      case 'email':
      if(!value.trim()){
        return 'Email is required';
      }
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)){
        return 'Invalid email';
      }
      return '';
    case 'password':
      if(!value.trim()){
        return 'Password is required';
      }
      if(value.length < 6){
        return 'Password must be at least 6 characters';
      }
      return '';
    case 'confirmPassword':
      if(!value.trim()){
        return 'Confirm password is required';
      }
      if(value !== formData.password){
        return 'Passwords do not match';
      }
      return '';
    default:
      return '';
    }

  }

  /** Handle Change */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev)=>({
      ...prev,
      [name]: value,
    }));
    
    // Validate the field
    const error = handleValidate(name, value);
    setErrors((prev)=>({
      ...prev,
      [name]: error,
    }));

  };

  /** Handle Blur */
  const handleBlur = (e) => {
    const { name } = e.target;

    setTouched((prev)=>({
      ...prev,
      [name]: true,
    }));
  };

  /** Handle Submit */
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = handleValidate(key, formData[key]);
      newErrors[key] = error;
    });

    setErrors(newErrors);
    
    const newTouched = {};
    Object.keys(formData).forEach((key) => {
      newTouched[key] = true;
    });

    setTouched(newTouched);

    const hasErrors = Object.values(newErrors).some((v) => Boolean(v));
    if (hasErrors) return;

    handleRegister();
    
  };


  /** Handle Register */
const handleRegister = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setServerError("");

    try {
      const payload = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        password: formData.password,
      };

      const response = await http.post("/api/auth/signup", payload);

      console.log(response.data);
      const { user, token } = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      Swal.fire({
        title: "Good job!",
        text: "Account created successfully!",
        icon: "success"
      });
      setFormData(initialState);
      setErrors({});
      setTouched({});
      if (user?.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Signup failed";
      setServerError(message);
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1.5">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Emma"
              className={`mt-1 w-full rounded-xl border bg-white px-4 py-3 text-sm text-charcoal placeholder:text-gray-300 outline-none  focus:border-violet-400 focus:ring-2 focus:ring-violet-100 ${
                touched.firstName && errors.firstName ? "border-rose-500" : "border-slate-200"
              }`}
            />
            {errors.firstName && touched.firstName && (
              <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1.5">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Thompson"
              className={`w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-charcoal placeholder:text-gray-300 focus:outline-none focus:border-charcoal transition-colors ${errors.lastName && touched.lastName ? 'border-red-500' : ''}`}
            />
            {errors.lastName && touched.lastName && (
              <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1.5">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="you@example.com"
            className={`w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-charcoal placeholder:text-gray-300 focus:outline-none focus:border-charcoal transition-colors ${errors.email && touched.email ? 'border-red-500' : ''}`}
          />
          {errors.email && touched.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-charcoal">
              Password
            </label>
          </div>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your password"
            className={`w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-charcoal placeholder:text-gray-300 focus:outline-none focus:border-charcoal transition-colors ${errors.password && touched.password ? 'border-red-500' : ''}`}
          />
          {errors.password && touched.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1.5">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Confirm your password"
            className={`w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-charcoal placeholder:text-gray-300 focus:outline-none focus:border-charcoal transition-colors ${errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : ''}`}
            data-rr-is-password="true"
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-coral text-white text-sm font-semibold py-3.5 rounded-xl hover:bg-coral/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {loginToggle ? "Sign In" : "Create Account"}{" "}
          <i className="ri-arrow-right-line"></i>
        </button>
        {serverError && (
          <p className="text-red-500 text-xs mt-2 text-center">{serverError}</p>
        )}
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
