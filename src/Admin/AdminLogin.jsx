import React, { useEffect, useState, useContext } from "react"; // 3 hooks
import { Link, useNavigate } from "react-router-dom"; // library  (big)
import axios from "axios"; // fetch api
import { Breadcrumb, BreadcrumbItem } from "flowbite-react"; // ignore
import { HiHome } from "react-icons/hi"; // ignore
import OtpInput from "react-otp-input"; //
import { BaseUrl } from "../Components/BaseUrl"; //
import { SuccessAlert, ErrorAlert, FailedAlert } from "../Components/Alerts"; // pops
import { LoginContext } from ".././context/LoginContext"; //library (big)
import SnackBarAlert from "../Components/SnackBarAlert"; // ignore
import loginbg from "../assets/loginbg.jpg"

const AdminLogin = () => {
  // state props componetnts hooks
  const navigate = useNavigate();
  const { loggedInUser, setLoggedInUser } = useContext(LoginContext);
  const [showLogin, setShowLogin] = useState(true);
  const [hideOtpModal, setHideOtpModal] = useState("hidden"); //initially hide otp modal
  const [isOtpCorrect, setIsOtpCorrect] = useState(false);
  const [loginSuccessAlert, setLoginSuccessAlert] = useState(false);
  const [wrongPassCpassAlert, setwrongPassCpassAlert] = useState(false);

  // Patient Registration form data starts
  const [patientName, setName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientMobile, setPatientMobile] = useState();
  const [patientPassword, setPassword] = useState("");
  const [patientConPassword, setConPassword] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [patientSex, setPatientSex] = useState("");
  // Patient Registration form data ends

  // patient login form data starts
  const [patientLoginEmail, setPatientLoginEmail] = useState("");
  const [patientLoginPassword, setLoginPassword] = useState("");

  const [otp, setOtp] = useState("");
  const [alert, setAlert] = useState({ message: "", status: "99" }); //no alert or Snackbar when status is 99
  const [showPassword, setShowPassword] = useState(false);

  // const { isloggedIn, loginUser, logoutUser, isAuthenticated } = useContext(LoginContext);

  const displayLogin = () => {
    setShowLogin(true);
  };

  const displayRegistration = () => {
    setShowLogin(false);
  };

  // login api hit starts
  const loginSuccessAlertf = async () => {
    setLoginSuccessAlert(true);
    setTimeout(() => {
      setLoginSuccessAlert(false);
    }, 3000);
  };
  const loginPatient = async (e) => {
    e.preventDefault();
    const loginForm = {
      email: patientLoginEmail,
      password: patientLoginPassword,
      role: "admin",
    };

    try {
      const loginResponse = await axios.post(
        `${BaseUrl}/api/auth/loginUser`, // Corrected endpoint (assuming it is a login endpoint)
        loginForm,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (loginResponse.status === 200) {
        setLoggedInUser({
          isloggedIn: true,
          jwt: loginResponse.data.token,
          email: loginResponse.data.email,
          userId: loginResponse.data.userId,
        });
        console.log({
          isloggedIn: true,
          jwt: loginResponse.data.token,
          email: loginResponse.data.email,
          userId: loginResponse.data.userId,
        });
        localStorage.removeItem("userDetails");
        localStorage.removeItem("donorDetails");
        localStorage.removeItem("doctorDetails");
        
        localStorage.setItem(
          "adminDetails",
          JSON.stringify({
            isloggedIn: true,
            jwt: loginResponse.data.token,
            role: "admin",
            email: loginResponse.data.email,
            userId: loginResponse.data.userId,
          })
        );
        setAlert({ message: "Logged in Successfully!", status: "200" });
        // localStorage code above
        setTimeout(() => {
          location.reload();
        }, 2000);
      }
    } catch (error) {
      // Corrected error handling
      if (error.response && error.response.status === 404) {
        setAlert({
          message: "User not registered in database.",
          status: "404",
        });
        setTimeout(() => {
          setAlert({ message: "", status: "99" });
        }, 5000);
      } else if (error.response && error.response.status === 400) {
        setAlert({ message: "Incorrect Password !", status: "400" });
        setTimeout(() => {
          setAlert({ message: "", status: "99" });
        }, 5000);
      } else {
        console.error(error);
        setAlert({
          message: "Something went wrong! Server issue",
          status: "500",
        });
        setTimeout(() => {
          setAlert({ message: "", status: "99" });
        }, 5000);
      }
    }
  };

  // registration api hit starts
  const handlePatientRegistration = async (e) => {
    e.preventDefault();

    const registrationForm = new FormData();

    registrationForm.append("email", patientEmail);
    registrationForm.append("mobile", patientMobile);
    registrationForm.append("role", "admin");

    //confim password and cpassword should be same
    if (patientPassword !== patientConPassword) {
      console.log("Passwords do not match!");

      //   message: "Password and confirm password does not match",
      //   status: "500",
      // });
      // setTimeout(() => {
      //   setAlert({ message: "", status: "99" });
      // }, 5000);

      setwrongPassCpassAlert(true);
      setTimeout(() => {
        setwrongPassCpassAlert(false);
      }, 3000); // Optionally show an alert or update the UI
      return; // Prevent further execution if passwords don't match
    }

    try {
      const response = await axios.post(
        `${BaseUrl}/api/auth/registerUser`,
        registrationForm,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        // Handle successful registration
        setHideOtpModal(" "); //maek the otp modal box visible
        console.log("Otp sent ");
      } else {
        // Handle registration failure
        console.error("Registration failed!");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setAlert({
          message: "This email is already registered",
          status: "400",
        });
        setTimeout(() => {
          setAlert({ message: "", status: "99" });
        }, 5000);
        console.error("An error occurred:", error);
      }
      console.error("An error occurred:", error);
    }
  };

  const verifyOtp = async (e) => {
    // Ensure to prevent default form submission

    const verifyOtpData = {
      name: patientName,
      mobile: patientMobile,
      password: patientPassword,
      confirmPassword: patientConPassword,
      age: patientAge,
      sex: patientSex,
      email: patientEmail,
      otp: otp,
      role: "admin",
    };

    try {
      const response = await axios.post(
        `${BaseUrl}/api/auth/verifyOTP`,
        verifyOtpData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("OTP verified, registration done");
        setIsOtpCorrect("correct"); // verify it matches make that true
        // loginUser("sample-jwt-token", "patient", "user-id", "user@example.com");
        setTimeout(() => {
          navigate("/adminlogin");
        }, 2000);
        setHideOtpModal("hidden");
      } else {
        console.log("Error:", response.data.message);
        console.log("Status:", response.status);
        setIsOtpCorrect(true); // verify it matches make that true
        // Set the alert that the entered OTP does not match
        console.error("Registration failed!");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setAlert({
          message: "Invalid OTP. Please try again.",
          status: "400",
        });
        setTimeout(() => {
          setAlert({ message: "", status: "99" });
        }, 5000);
      }
      if (error.response && error.response.status === 500) {
        setAlert({
          message: "Something went wrong! Server issue",
          status: "500",
        });
        setTimeout(() => {
          setAlert({ message: "", status: "99" });
        }, 5000);
      }
      console.error("An error occurred:", error);
    }
    setOtp(""); //clear the otp field after clicking the submit button
  };
  // Otp verification axios ends

  // useEffect(() => {
  //   if (otp.length == 6) {
  //     verifyOtp();
  //   }
  // }, [otp]);

  return (
    <div
       className="Patient-login-form bg-cover bg-center"
       style={{ backgroundImage: `url(${loginbg})` }}
     >
      <SnackBarAlert message={alert.message} statusCode={alert.status} />

      {/* Breadcrum starts */}
      <div className="p-8">
        <Breadcrumb aria-label="Default breadcrumb example">
          <BreadcrumbItem href="/" icon={HiHome}>
            Home
          </BreadcrumbItem>

          <BreadcrumbItem>Admin Login</BreadcrumbItem>
          {/* <BreadcrumbItem>Flowbite React</BreadcrumbItem> */}
        </Breadcrumb>
      </div>
      {/* Breadcrum ends */}

      {loginSuccessAlert ? (
        <SuccessAlert message="Logged in successfully!" />
      ) : (
        ""
      )}
      {wrongPassCpassAlert ? (
        <ErrorAlert message="Password and Confirm Password do not match!" />
      ) : (
        ""
      )}
      {/* <ErrorAlert message="Wrong Password !"/> */}
      {/* <FailedAlert message="Unauthorized!"/>  */}

      <div className="w-full flex justify-center align-middle">
        {/* Otp verification Modal starts */}
        <div
          id="popup-modal"
          tabIndex="-1"
          className={`${hideOtpModal} overflow-y-auto overflow-x-hidden fixed inset-0 z-50 flex justify-center items-center w-full h-full`}
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* <button type="button" onClick={()=>setHideOtpModal("hidden")} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
            </button> */}
              <div className="p-4 md:p-5 text-center">
                <svg
                  className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <p className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Please enter the OTP which was sent to your email:{" "}
                  <strong>{patientEmail}</strong>.
                </p>
                {!isOtpCorrect ? (
                  <p className="mb-5 text-lg font-normal text-red-700 dark:text-red-700"></p>
                ) : (
                  <p className="mb-5 text-lg font-normal text-green-500 dark:text-green-500">
                    Account Created Successfully!
                  </p>
                )}

                {/* react otp input starts */}
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderSeparator={<span> - </span>}
                  containerStyle={"justify center"}
                  inputStyle={{
                    color: "red",
                    border: "1px solid #ccc",
                    padding: "10px",
                    width: "40px",
                    margin: "5px",
                  }}
                  renderInput={(props) => <input {...props} />}
                />
                {/* react otp input ends */}

                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400"></h3>
                <div
                  data-modal-hide="popup-modal"
                  onClick={verifyOtp}
                  className=" mx-2 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  Submit Otp
                </div>
                <div
                  data-modal-hide="popup-modal "
                  onClick={(e) => {
                    handlePatientRegistration(e);
                  }}
                  className="mx-2 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  Resend OTP
                </div>
                {/* <button
                  data-modal-hide="popup-modal"
                  type="button"
                 
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Resend OTP
                </button> */}
              </div>
            </div>
          </div>
        </div>
        {/* Otp verification Modal ends */}

        <div className="lg:w-3/5  flex">
          {showLogin ? (
            //   login form starts
            <form
              className="max-w-sm mx-auto border-2 border-custom-maroon2 bg-white rounded-lg p-5 m-5 w-full "
              onSubmit={loginPatient}
            >
              <div className="mb-5">
                <div className="heading text-center font-bold text-2xl">
                  Admin <span className="text-custom-maroon">Login</span>
                </div>
                <div className="togglle flex w-full justify-center">
                  <div
                    className="login rounded-md bg-custom-maroon text-white p-2 border w-1/2 flex justify-center align-middle my-2"
                    onClick={displayLogin}
                  >
                    Login
                  </div>
                  <div
                    className="registration  p-2 border w-1/2 flex justify-center align-middle my-2"
                    onClick={displayRegistration}
                  >
                    Registration
                  </div>
                </div>

                <label
                  htmlFor="website-admin"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                    </svg>
                  </span>
                  {/* patient login starts */}
                  <input
                    value={patientLoginEmail}
                    onChange={(e) => setPatientLoginEmail(e.target.value)}
                    type="email"
                    id="website-admin"
                    className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your email/username"
                  />
                </div>
              </div>
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your password
                </label>
                {/* <input
                  value={patientLoginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  type="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                /> */}

                <div className="max-w-sm">
                  <div className="relative">
                    {/* hidden show password */}
                    <div>
                      <input
                        id="hs-toggle-password"
                        type={showPassword ? "text" : "password"}
                        className="py-3 ps-4 pe-10 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        placeholder="Enter password"
                        value={patientLoginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          showPassword
                            ? setShowPassword(false)
                            : setShowPassword(true)
                        }
                        className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500"
                      >
                        <svg
                          className="shrink-0 size-3.5"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path
                            className="hs-password-active:hidden"
                            d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
                          ></path>
                          <path
                            className="hs-password-active:hidden"
                            d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
                          ></path>
                          <path
                            className="hs-password-active:hidden"
                            d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
                          ></path>
                          <line
                            className="hs-password-active:hidden"
                            x1="2"
                            x2="22"
                            y1="2"
                            y2="22"
                          ></line>
                          <path
                            className="hidden hs-password-active:block"
                            d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                          ></path>
                          <circle
                            className="hidden hs-password-active:block"
                            cx="12"
                            cy="12"
                            r="3"
                          ></circle>
                        </svg>
                      </button>
                    </div>
                    {/* hidden show password */}
                  </div>
                </div>

                {/* patient login ends */}
              </div>
              <div className="flex items-start mb-5">
                <div className="flex items-center h-5">
                  {/* <input
                    id="remember"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                    required
                  /> */}
                </div>
                {/* <label
                  htmlFor="remember"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Remember me
                </label> */}
                <div className="flex">
                  <p>Change Password :-</p>
                  <Link to="../adminforgotPass">
                    {" "}
                    <p className="pl-5 text-blue-500 font-bold underline">
                      Forgot Password
                    </p>
                  </Link>
                </div>
              </div>

              <div className="w-full flex justify-center align-middle">
                <button
                  type="submit"
                  className="text-white bg-custom-maroon hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Login
                </button>

                {/* login form button and it also ends */}
              </div>
            </form>
          ) : (
            // login form ends
            // registration form starts
            <form
              className="max-w-sm mx-auto border-2 border-custom-maroon2 bg-white rounded-lg p-10 m-3  w-full"
              onSubmit={handlePatientRegistration}
            >
              <div className="mb-5">
                <div className="heading text-center font-bold text-2xl">
                  Admin <span className="text-custom-maroon">Registraiton</span>
                </div>
                <div className="togglle flex w-full justify-center">
                  <div
                    className="login p-2 border w-1/2 flex justify-center align-middle my-2"
                    onClick={displayLogin}
                  >
                    Login
                  </div>
                  <div
                    className="registration bg-custom-maroon text-white rounded-md  p-2 border w-1/2 flex justify-center align-middle my-2"
                    onClick={displayRegistration}
                  >
                    Registration
                  </div>
                </div>

                {/* 1. email for registration starts */}
                {/* <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="email"
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    name="floating_email"
                    id="floating_email"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="floating_email"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Email address
                  </label>
                </div> */}

                {/* <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="password"
                    value={patientPassword}
                    onChange={(e) => setPassword(e.target.value)}
                    name="floating_password"
                    id="floating_password"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="floating_password"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Password
                  </label>
                </div>
      */}

                {/* <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="password"
                    value={patientConPassword}
                    onChange={(e) => setConPassword(e.target.value)}
                    name="repeat_password"
                    id="floating_repeat_password"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="floating_repeat_password"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Confirm password
                  </label>
                </div> */}

                {/* <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="text"
                      value={patientName}
                      onChange={(e) => setName(e.target.value)}
                      name="floating_first_name"
                      id="floating_first_name"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="floating_first_name"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Full Name
                    </label>
                  </div>
            

            
                  <div className="relative z-0 w-full mb-5 group">
                    <select
                      value={patientSex}
                      onChange={(e) => setPatientSex(e.target.value)}
                      name="patientSex"
                      id="patientSex"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      required
                    >
                      <option value="" disabled>
                        Select Gender
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    <label
                      htmlFor="patientSex"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Gender
                    </label>
                  </div>
     
                </div> */}

                {/* <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="number"
                      value={patientMobile}
                      onChange={(e) => {
                        setPatientMobile(e.target.value);
                      }}
                      name="floating_phone"
                      id="floating_phone"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="floating_phone"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Phone number{" "}
                    </label>
                  </div>

                  <div className="relative z-0 w-full mb-5 group">
                    <select
                      value={patientAge}
                      onChange={(e) => setPatientAge(e.target.value)}
                      name="patientAge"
                      id="patientAge"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      required
                    >
                      <option value="" disabled>
                        Select Age
                      </option>

                      {[...Array(115)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                    <label
                      htmlFor="patientAge"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Age
                    </label>
                  </div>
                </div> */}
              </div>
Contact Developer for Registraiton 
              {/* <div className="w-full flex justify-center align-middle">
                <button
                  type="submit"
                  className="text-white bg-custom-maroon hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Register
                </button>
              </div> */}
            </form>
            // registration form ends
          )}

          {/*login form ends */}
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
