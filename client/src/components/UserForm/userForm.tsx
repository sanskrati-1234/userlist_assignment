import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "./userSchema";
import type { UserSchema } from "./userSchema";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./userForm.module.css";

const UserForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (data: UserSchema) => {
    try {
      const response = await fetch("http://localhost:3000/api/users/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        toast.success("User added successfully!");
        reset();
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to add user");
      }
    } catch (error) {
      toast.error("Network error");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className={styles.form}
      >
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Name:
          </label>
          <input id="name" {...register("name")} className={styles.input} />
          {errors.name && (
            <span className={styles.error}>{errors.name.message}</span>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email:
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className={styles.input}
          />
          {errors.email && (
            <span className={styles.error}>{errors.email.message}</span>
          )}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Role:</label>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                value="user"
                {...register("role")}
                className={styles.radio}
              />
              User
            </label>
            <label className={styles.radioLabel} style={{ marginLeft: "1rem" }}>
              <input
                type="radio"
                value="admin"
                {...register("role")}
                className={styles.radio}
              />
              Admin
            </label>
          </div>
          {errors.role && (
            <span className={styles.error}>{errors.role.message}</span>
          )}
        </div>
        <button type="submit" className={styles.submitButton}>
          Add User
        </button>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        closeOnClick
        pauseOnHover
      />
    </>
  );
};

export default UserForm;
