/* eslint-disable react/no-unescaped-entities */
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { isAuthenticated, signin, errors: signinErrors } = useAuth();

  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <div className=" flex justify-around py-5 px-2 ">
      <div className="card backdrop-container p-4">
        <h1 className="h3 text-center mb-3">Sign in to your account</h1>

        {signinErrors.map((er, i) => (
          <div className="alert alert-danger" key={i}>
            {er}
          </div>
        ))}

        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              autoComplete="email"
              className={`backdrop-container form-control ${
                errors.email ? "is-invalid" : ""
              }`}
            />
            {errors.email && (
              <div className="invalid-feedback">Email is required</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="d-flex justify-content-between align-items-center gap-x-3">
              <input
                {...register("password", { required: true })}
                type="password"
                autoComplete="current-password"
                className={`backdrop-container form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
              />
              <a href="#">Forgot password?</a>
            </div>
            {errors.password && (
              <div className="invalid-feedback">Password is required</div>
            )}
          </div>

          <button className="btn btn-primary w-100">Sign in</button>
        </form>

        <p className="mt-3 text-center text-sm">
          Don't have an account?{" "}
          <span
            className="text-zinc-100 cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
