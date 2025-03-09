import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRegisterMutation } from "../../components/features/Auth/authApiSlice";
import toast from "react-hot-toast";
import ToastComponent from "../../components/common/ToastComponent";

const Register = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [retypePassword, setRetypePassword] = useState("");

  const [register, { isLoading }] = useRegisterMutation();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      if (user.password !== retypePassword) {
        toast.error("Passwords doesn't match. Please check again...!");
        return;
      }
      const requestPromise = register(user).unwrap();
      toast.promise(requestPromise, {
        loading: "Please wait!. We are Signing you up...",
        success: "You are Registered Successfully",
        error: (err) =>
          `Sign up failed: ${
            err?.Message ||
            err?.data?.Message ||
            err?.data?.title ||
            "Something Went Wrong...!"
          }`,
      });
      await requestPromise;
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <ToastComponent />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-boxdark">
        <div className="relative flex flex-col bg-transparent rounded-sm  border-stroke bg-white drop-shadow-2 dark:border-strokedark dark:bg-boxdark p-10">
          <h4 className="block text-xl font-medium text-slate-800">Sign Up</h4>
          <p className="text-slate-500 font-light">
            Nice to meet you! Enter your details to register.
          </p>
          <form
            className="mt-5 mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={handleRegister}
          >
            <div className="mb-1 flex flex-col gap-6">
              <div className="w-full max-w-sm min-w-[200px]">
                <label className="block mb-2 text-sm text-slate-600">
                  First Name
                </label>
                <input
                  value={user.firstName}
                  onChange={handleInputChange}
                  name="firstName"
                  type="text"
                  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  placeholder="First Name"
                  required
                />
              </div>
              <div className="w-full max-w-sm min-w-[200px]">
                <label className="block mb-2 text-sm text-slate-600">
                  Last Name
                </label>
                <input
                  value={user.lastName}
                  onChange={handleInputChange}
                  name="lastName"
                  type="text"
                  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  placeholder="Last Name"
                  required
                />
              </div>
              <div className="w-full max-w-sm min-w-[200px]">
                <label className="block mb-2 text-sm text-slate-600">
                  Email
                </label>
                <input
                  value={user.email}
                  onChange={handleInputChange}
                  name="email"
                  type="email"
                  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div className="w-full max-w-sm min-w-[200px]">
                <label className="block mb-2 text-sm text-slate-600">
                  Password
                </label>
                <input
                  value={user.password}
                  onChange={handleInputChange}
                  name="password"
                  type="password"
                  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  placeholder="Your Password"
                  required
                />
              </div>
              <div className="w-full max-w-sm min-w-[200px]">
                <label className="block mb-2 text-sm text-slate-600">
                  Retype Password
                </label>
                <input
                  value={retypePassword}
                  onChange={(e) => setRetypePassword(e.target.value)}
                  name="retypePassword"
                  type="password"
                  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  placeholder="Type your Password again"
                  required
                />
              </div>
            </div>

            <button
              className="mt-4 w-full rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="submit"
              disabled={isLoading}
            >
              Sign Up
            </button>
            <p className="flex justify-center mt-6 text-sm text-slate-600">
              If you already have an account?
              <Link
                to="/login"
                className="ml-1 text-sm font-semibold text-slate-700 underline"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;