import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Swal from "sweetalert2";
import { createUser, updateUser } from "../../../api/admin/user";

const userSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  email: z.string().email("Enter a valid email"),
  role: z.enum(["admin", "user"]),
  status: z.enum(["active", "blocked"]),
});

const generatePassword = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  return Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
};

export const AddUserModal = ({ editUser, onUserAdded, onUserUpdated, onClose }) => {
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "user",
      status: "active",
    },
  });

  useEffect(() => {
    if (!editUser) {
      reset({
        name: "",
        email: "",
        role: "user",
        status: "active",
      });
      return;
    }

    setValue("name", editUser.name || "");
    setValue("email", editUser.email || "");
    setValue("role", editUser.role || "user");
    setValue("status", editUser.isBlocked ? "blocked" : "active");
  }, [editUser, reset, setValue]);

  const onSubmit = async (values) => {
    try {
      setSubmitError("");
      const payload = {
        name: values.name,
        email: values.email,
        role: values.role,
        isBlocked: values.status === "blocked",
        isVerified: values.status === "active",
      };

      if (editUser) {
        const { data } = await updateUser(editUser._id, payload);

        if (!data?.success) {
          setSubmitError(data?.message || "Failed to update user.");
          return;
        }

        onUserUpdated?.(data.user);
        await Swal.fire({
          title: "Updated",
          text: "User details were updated successfully.",
          icon: "success",
          timer: 1400,
          showConfirmButton: false,
        });
      } else {
        const { data } = await createUser({ ...payload, password: generatePassword() });

        if (!data?.success) {
          setSubmitError(data?.message || "Failed to add user.");
          return;
        }

        onUserAdded?.(data.user);
        await Swal.fire({
          title: "User added",
          text: "New user was added successfully.",
          icon: "success",
          timer: 1400,
          showConfirmButton: false,
        });
      }

      reset();
      onClose?.();
    } catch (err) {
      setSubmitError(err?.response?.data?.message || err.message || (editUser ? "Failed to update user." : "Failed to add user."));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      <div className="relative bg-white border border-background-200/70 rounded-2xl w-full max-w-md p-6 animate-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-foreground-950 font-heading">
            {editUser ? "Edit User" : "Add New User"}
          </h2>
          <button
            onClick={() => onClose?.()}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-foreground-400 hover:bg-background-100 hover:text-foreground-600 transition-colors cursor-pointer"
          >
            <span className="w-4 h-4 flex items-center justify-center">
              <i className="ri-close-line text-lg"></i>
            </span>
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium text-foreground-700 mb-1.5">
              Full Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter full name"
              {...register("name")}
              className="w-full px-4 py-2.5 bg-background-100 border rounded-lg text-sm text-foreground-900 outline-none transition-colors focus:border-primary-300 placeholder:text-foreground-300 border-background-200/70"
            />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground-700 mb-1.5">
              Email Address <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              placeholder="Enter email address"
              {...register("email")}
              className="w-full px-4 py-2.5 bg-background-100 border rounded-lg text-sm text-foreground-900 outline-none transition-colors focus:border-primary-300 placeholder:text-foreground-300 border-background-200/70"
            />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground-700 mb-1.5">Role</label>
            <select
              {...register("role")}
              className="w-full px-4 py-2.5 bg-background-100 border border-background-200/70 rounded-lg text-sm text-foreground-900 outline-none transition-colors focus:border-primary-300 cursor-pointer"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground-700 mb-1.5">Status</label>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  {...register("status")}
                  value="active"
                  defaultChecked
                  className="text-primary-500 focus:ring-primary-400"
                />
                <span className="text-sm text-foreground-700">Active</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  {...register("status")}
                  value="blocked"
                  className="text-primary-500 focus:ring-primary-400"
                />
                <span className="text-sm text-foreground-700">Blocked</span>
              </label>
            </div>
          </div>

          {submitError && <p className="text-sm text-red-600">{submitError}</p>}

          <div className="flex items-center gap-3 mt-6 pt-4 border-t border-background-200/50">
            <button
              type="button"
              onClick={() => onClose?.()}
              className="flex-1 px-4 py-2.5 border border-background-200/70 rounded-lg text-sm font-medium text-foreground-600 hover:bg-background-100 transition-colors cursor-pointer whitespace-nowrap"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2.5 bg-primary-500 text-background-50 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-60"
            >
              {isSubmitting ? (editUser ? "Updating..." : "Saving...") : editUser ? "Update User" : "Add User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
