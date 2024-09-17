import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import { Form } from "react-bootstrap";
import image from "../images/naeem_logo_1024white.png";
import image2 from "../images/tra.png";
import { Link, useNavigate } from "react-router-dom";
import { CreateContext } from "../Context/Context";
import { LuSun } from "react-icons/lu";
import { HiOutlineMoon } from "react-icons/hi";
import axios from "axios";
import { CiWarning } from "react-icons/ci";
import { FaRegCircleCheck } from "react-icons/fa6";
import PasswordInput from "../InputsField/InputPassword";

const Login = () => {
  const navigate = useNavigate();
  const usecon = useContext(CreateContext);
  const [password, setPassword] = useState("");
  const [Accept, setAccept] = useState(false);
  const [errorLogin, setErrorLogin] = useState("");
  useEffect(() => {
    if (localStorage.length > 1) {
      localStorage.removeItem("token");
      localStorage.setItem("i18nextLng", "en");
      // window.location.reload()
    }
  }, []);
  async function Submit(e) {
    let checkLogin;
    setErrorLogin("");
    e.preventDefault();
    setAccept(true);
    await axios
      .post("http://localhost:3005/auth/check-login", {
        userId: usecon.userId,
      })
      .then((res) => {
        if (res.data.data == true) {
          checkLogin = true;
        } else {
          checkLogin = false;
        }
      });
    if (checkLogin == true) {
      await axios
        .post(`http://localhost:3005/auth/login?type=${usecon.loginType}`, {
          userId: usecon.userId,
          password: password,
        })
        .then((res) => {
          if (res.status === 200) {
           
            setErrorLogin("");
            const token = res.data.token;
            localStorage.setItem("token", token);
            localStorage.setItem("id", res.data.user.userid);
            sessionStorage.setItem("id", res.data.user.userid);
            const storageToken = localStorage.getItem("token");
            const userDetails = res.data.user;
            console.log(userDetails);
            usecon.setauth({ storageToken, userDetails });
            // leaves_counter_con.setToken(token)
            if (usecon.loginType == "manager") {
              navigate("/managerdashboard");
            } else if (usecon.loginType == "hr") {
              navigate("/hr/dashboard");
            } else {
              navigate("/dashboard/userDetails");
            }
          }
        })
        .catch((err) => {
          console.log(err);
          setErrorLogin(err?.response?.data?.sta?.split("at")?.[0]);
        });
    } else {
      axios
        .post("http://localhost:3005/auth/firstLogin", {
          userId: usecon.userId,
          password: password,
        })
        .then((res) => {
          if (res.status == 200) {
            navigate("/auth/setPassword");
            setErrorLogin("");
          }
        })
        .catch((err) => {
          setErrorLogin("Must the password be the same as the userid");
        });
    }
  }

  if (errorLogin != "") {
    function timerFunc() {
      const timer = setTimeout(() => {
        setErrorLogin("");
      }, 4000);
      return () => clearTimeout(timer);
    }
    timerFunc();
  }

  // Token
  return (
    <section
      className={`${
        usecon.darkMode && "darkmodeBody"
      } h-screen flex justify-center items-center login-section`}
    >
      {usecon.succesLogin != "" && (
        <div className=" bg-green-600 fixed top-4 px-4 py-4 text-xl"></div>
      )}
      {usecon.succesLogin != "" && (
        <div
          className={` text-white fixed gap-2
                 duration-200 -translate-x-1/2 bg-green-500 px-20 flex items-center text-lg py-3 rounded-lg top-0 left-2/4 tracking-wider mt-1`}
        >
          <div className="text-2xl">
            <FaRegCircleCheck />
          </div>
          Your password has been reset please log in again
        </div>
      )}
      <div
        className={`px-2 py-2 w-fit absolute top-5 right-10 clockinNav ${
          usecon.darkMode
            ? "bg-tranparent border"
            : "OriginalBackground NoOutlines"
        } rounded-lg text-white cursor-pointer text-2xl`}
      >
        {usecon.darkMode ? (
          <div onClick={usecon.a1}>
            <LuSun />
          </div>
        ) : (
          <div onClick={usecon.a2}>
            <HiOutlineMoon />
          </div>
        )}
      </div>
      <div
        className={`login ${
          usecon.darkMode ? "darkContainer" : "bg-white"
        } relative z-10 rounded-xl shadow-xl`}
      >
        <form onSubmit={Submit} action="" method="">
          {usecon.darkMode ? (
            <div className="flex items-center justify-center  pt-3">
              <img src={image2} className="w-32 mx-auto h-32 rounded" alt="" />
            </div>
          ) : (
            <div className="flex items-center justify-center pt-3">
              <img src={image} className="w-32 mx-auto h-32 rounded" alt="" />
            </div>
          )}
          <div className="mb-3 space-y-1" controlId="exampleForm.ControlInput1">
            <label
              className={`LabelLogin ${usecon.darkMode && "text-white"}`}
              htmlFor="inputEmail5"
            >
              ID
            </label>
            <input
              id="inputEmail5"
              type="text"
              placeholder="Enter Your ID...."
              value={usecon.userId}
              onChange={(e) => usecon.setId(e.target.value)}
              required
              className={`${
                usecon.darkMode && "inputDark"
              } py-1.5 px-2 border rounded-lg w-full`}
            />
            {/* </div> */}
            {errorLogin !== "" && Accept ? (
              <div
                className={` text-white fixed gap-2 ${
                  errorLogin != "" ? "translate-y-0" : "-translate-y-96"
                } duration-200 -translate-x-1/2 bg-red-400 px-20 flex items-center text-lg py-3 rounded-lg top-0 left-2/4 tracking-wider mt-1`}
              >
                <div className="text-2xl">
                  <CiWarning />
                </div>
                {errorLogin}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="" controlId="exampleForm.ControlInput1"></div>
          <PasswordInput
            value={{
              password,
              setPassword,
              placeholder: "Password",
              label: "Password",
              classDiv: "mb-3 space-y-1",
            }}
          />

          <select
            required
            value={usecon.loginType}
            onChange={(e) => usecon.setLoginType(e.target.value)}
            aria-label="Default select example"
            className={`${
              usecon.darkMode && "inputDark"
            } mt-2 py-1.5 px-2 border rounded-lg w-full`}
          >
            <option value="" className="hidden">
              Choose Login Type
            </option>
            <option value="employee">Employee Login</option>
            <option value="manager">Manager Login</option>
            <option value="hr">HR Login</option>
          </select>
          {/* <div>
                        Forgot password?click here to <Link to="/forgetPassword">reset a password</Link>
                    </div> */}
          <div className="py-4 ">
            <Form.Group>
              <button
                style={{ fontSize: "20px" }}
                className="text-white text-center w-1/2 borderBackgroundHover flex relative items-center justify-between btnLogin duration-200 px-2 py-2 rounded-lg  OriginalBackground mx-auto "
                type="submit"
              >
                <span className={`text-center text-xl w-full `}>Login</span>
              </button>
            </Form.Group>
          </div>
        </form>
        <div className="flex items-center justify-center">
          <Link to="/forgetPassword" className="text-decoration-none">
            <div
              className={`${
                usecon.darkMode ? "text-white" : "OriginalColor"
              } flex gap-2 items-center`}
            >
              <span
                className={`${
                  usecon.darkMode && "text-white"
                } underline OriginalColor`}
              >
                Forgotten Password?
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};
export default Login;
