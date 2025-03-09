import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ToastComponent, {
  errorToast,
} from "../../components/common/ToastComponent";
import { useLoginMutation } from "../../components/features/Auth/authApiSlice";
import toast from "react-hot-toast";
import { setCredentials } from "../../components/features/Auth/authSlice";
import { useDispatch } from "react-redux";
// import loginBanner from "../../asset/images/login_banner.svg";
import loginBanner from "../../assets/images/Logo.png";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [loginCredentials, setLoginCredentials] = useState({
    userName: "",
    password: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    if (!loginCredentials.userName) {
      errorToast("Email is required...!");
      return;
    }
    if (!loginCredentials.password) {
      errorToast("Password is required...!");
      return;
    }
    try {
      const loginRequest = login(loginCredentials).unwrap();
      toast.promise(
        loginRequest,
        {
          loading: "Signin...",
          success: (data) => `Hi! Welcome ${data?.user?.firstName}`,
          error: (err) =>
            `SignIn failed: ${err?.Message ||
            err?.data?.Message ||
            err?.data?.title ||
            "Something Went Wrong...!"
            }`,
        },
        { duration: 3000 }
      );
      const response = await loginRequest;
      if (response) {
        dispatch(setCredentials(response));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* <Breadcrumb pageName="Sign In" /> */}
      <ToastComponent />
      <div className="flex items-center justify-center p-24 bg-gray-100 dark:bg-boxdark">
        <div className="rounded-sm  border-stroke bg-white drop-shadow-2 dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-wrap items-center ">
            <div className="hidden w-full xl:block xl:w-1/2">
              <div className="px-20 text-center">
                <img
                  className="w-[300px]"
                  src={loginBanner}
                  alt="login banner"
                />
              </div>
            </div>

            <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 border-l">
              <div className="w-full p-10">
                <h3 className="mb-9 font-bold text-black  text-title-lg">
                  Plan your adventure
                </h3>

                <div>
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black">
                      Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="userName"
                        value={loginCredentials?.userName}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />

                      <span className="absolute right-[10px] top-[10px]">
                        <svg
                          className="fill-current"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.5">
                            <path
                              d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="mb-2.5 block font-medium text-black ">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={isPasswordVisible ? "text" : "password"}
                        name="password"
                        value={loginCredentials?.password}
                        onChange={handleInputChange}
                        placeholder="6+ Characters, 1 Capital letter"
                        className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />

                      <span
                        className="absolute right-[10px] top-[10px]"
                        role="button"
                        onClick={() => setIsPasswordVisible((prev) => !prev)}
                      >
                        {isPasswordVisible ? (
                          <svg
                            viewBox="0 -0.5 25 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                          >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g
                              id="SVGRepo_tracerCarrier"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                              <path
                                d="M12.0003 5.251C7.96932 5.183 3.80032 8 1.17932 10.885C0.904199 11.1904 0.751953 11.5869 0.751953 11.998C0.751953 12.4091 0.904199 12.8056 1.17932 13.111C3.74332 15.935 7.90032 18.817 12.0003 18.748C16.1003 18.817 20.2583 15.935 22.8243 13.111C23.0994 12.8056 23.2517 12.4091 23.2517 11.998C23.2517 11.5869 23.0994 11.1904 22.8243 10.885C20.2003 8 16.0313 5.183 12.0003 5.251Z"
                                stroke="#71717A"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                d="M15.75 12C15.7498 12.7416 15.5297 13.4666 15.1175 14.0831C14.7054 14.6997 14.1196 15.1802 13.4344 15.4638C12.7491 15.7475 11.9952 15.8216 11.2678 15.6768C10.5404 15.532 9.87234 15.1748 9.348 14.6503C8.82365 14.1258 8.4666 13.4576 8.32198 12.7302C8.17737 12.0028 8.25169 11.2489 8.53555 10.5637C8.81941 9.87854 9.30005 9.29293 9.91672 8.88092C10.5334 8.46891 11.2584 8.249 12 8.249C12.4926 8.24887 12.9804 8.34581 13.4355 8.53428C13.8905 8.72275 14.304 8.99906 14.6523 9.34741C15.0006 9.69576 15.2768 10.1093 15.4651 10.5645C15.6535 11.0196 15.7503 11.5074 15.75 12Z"
                                stroke="#71717A"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>{" "}
                            </g>
                          </svg>
                        ) : (
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                          >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g
                              id="SVGRepo_tracerCarrier"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                              <path
                                d="M2.78309 20.9991L21.5323 2.99988"
                                stroke="#71717A"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                d="M19.7491 8.87964C20.8636 9.69316 21.8934 10.6168 22.8229 11.6365C23.098 11.9419 23.2503 12.3384 23.2503 12.7495C23.2503 13.1605 23.098 13.557 22.8229 13.8624C20.257 16.6863 16.0992 19.5682 11.9994 19.4992C10.9829 19.5068 9.97136 19.3591 8.99963 19.0614"
                                stroke="#71717A"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                d="M3.77916 16.2603C2.84594 15.5357 1.97616 14.7328 1.17927 13.8604C0.904163 13.555 0.751923 13.1585 0.751923 12.7475C0.751923 12.3364 0.904163 11.9399 1.17927 11.6345C3.80016 8.75164 7.96899 5.93275 11.9998 5.99975C12.7749 5.99106 13.548 6.07677 14.3021 6.2549"
                                stroke="#71717A"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                d="M11.9994 8.99963C11.5069 8.9995 11.0192 9.09641 10.5642 9.28481C10.1092 9.47321 9.69575 9.74941 9.34752 10.0976C8.99929 10.4459 8.72308 10.8593 8.53468 11.3143C8.35077 11.7585 8.25405 12.2338 8.24966 12.7143"
                                stroke="#71717A"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                d="M11.9995 16.4993C12.492 16.4993 12.9797 16.4023 13.4347 16.2138C13.8898 16.0253 14.3032 15.749 14.6514 15.4007C14.9996 15.0524 15.2758 14.6389 15.4642 14.1838C15.6495 13.7362 15.7463 13.2571 15.7493 12.7729"
                                stroke="#71717A"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </g>
                          </svg>
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="mb-5">
                    <input
                      disabled={isLoading}
                      type="submit"
                      value="Sign In"
                      onClick={handleLogin}
                      className="w-full cursor-pointer rounded-lg border border-boxdark bg-black p-2.5 text-white transition hover:bg-opacity-90"
                    />
                  </div>

                  {/* <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-4 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50"
                  >
                    <span>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_191_13499)">
                          <path
                            d="M19.999 10.2217C20.0111 9.53428 19.9387 8.84788 19.7834 8.17737H10.2031V11.8884H15.8266C15.7201 12.5391 15.4804 13.162 15.1219 13.7195C14.7634 14.2771 14.2935 14.7578 13.7405 15.1328L13.7209 15.2571L16.7502 17.5568L16.96 17.5774C18.8873 15.8329 19.9986 13.2661 19.9986 10.2217"
                            fill="#4285F4"
                          />
                          <path
                            d="M10.2055 19.9999C12.9605 19.9999 15.2734 19.111 16.9629 17.5777L13.7429 15.1331C12.8813 15.7221 11.7248 16.1333 10.2055 16.1333C8.91513 16.1259 7.65991 15.7205 6.61791 14.9745C5.57592 14.2286 4.80007 13.1801 4.40044 11.9777L4.28085 11.9877L1.13101 14.3765L1.08984 14.4887C1.93817 16.1456 3.24007 17.5386 4.84997 18.5118C6.45987 19.4851 8.31429 20.0004 10.2059 19.9999"
                            fill="#34A853"
                          />
                          <path
                            d="M4.39899 11.9777C4.1758 11.3411 4.06063 10.673 4.05807 9.99996C4.06218 9.32799 4.1731 8.66075 4.38684 8.02225L4.38115 7.88968L1.19269 5.4624L1.0884 5.51101C0.372763 6.90343 0 8.4408 0 9.99987C0 11.5589 0.372763 13.0963 1.0884 14.4887L4.39899 11.9777Z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M10.2059 3.86663C11.668 3.84438 13.0822 4.37803 14.1515 5.35558L17.0313 2.59996C15.1843 0.901848 12.7383 -0.0298855 10.2059 -3.6784e-05C8.31431 -0.000477834 6.4599 0.514732 4.85001 1.48798C3.24011 2.46124 1.9382 3.85416 1.08984 5.51101L4.38946 8.02225C4.79303 6.82005 5.57145 5.77231 6.61498 5.02675C7.65851 4.28118 8.9145 3.87541 10.2059 3.86663Z"
                            fill="#EB4335"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_191_13499">
                            <rect width="20" height="20" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                    Sign in with Google
                  </button> */}

                  <div className="mt-6 text-center">
                    <p className="flex justify-center mt-6 text-sm text-slate-600">
                      Don&apos;t have an account?
                      <Link
                        to="/register"
                        className="ml-1 text-sm font-semibold text-slate-700 underline"
                      >
                        Sign up
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;