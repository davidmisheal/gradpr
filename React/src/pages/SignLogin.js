import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../context/UserContext"; // Import useUser hook
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import "@fortawesome/fontawesome-free/css/all.css";

export default function SignLogin() {
  const [showUserIn, setShowUserIn] = useState(true)
  const [showUserUp, setShowUserUp] = useState(true)

  const [showAdminIn, setShowAdminIn] = useState(false)
  const [showAdminUp, setShowAdminUp] = useState(false)
  const [signUpState, setSignUpState] = useState(false)

  function handleOptionsSignIn(option) {
    if (option === 'user') {
      setShowUserIn(true);
      setShowAdminIn(false);
    } else if (option === 'admin') {
      setShowUserIn(false);
      setShowAdminIn(true);
    }
  }

  function handleOptionsSignUp(option) {
    if (option === 'user') {
      setShowUserUp(true);
      setShowAdminUp(false);
      formData.role='user'
    } else if (option === 'admin') {
      setShowUserUp(false);
      setShowAdminUp(true);
      formData.role='admin'
    }
  }
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    photo: "",
    role:"user"
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    photo:"",
    role:""
  });
  const navigate = useNavigate();
  const { setUser } = useUser(); // Get setUser from context

  useEffect(() => {
    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");
    const container = document.getElementById("container");

    const handleSignUpClick = () =>
      container.classList.add("right-panel-active");
    const handleSignInClick = () =>
      container.classList.remove("right-panel-active");

    if (signInButton && signUpButton && container) {
      signUpButton.addEventListener("click", handleSignUpClick);
      signInButton.addEventListener("click", handleSignInClick);
    }

    return () => {
      if (signInButton && signUpButton) {
        signUpButton.removeEventListener("click", handleSignUpClick);
        signInButton.removeEventListener("click", handleSignInClick);
      }
    };
  }, []);
  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    const { name, email, password, confirmPassword, photo,role } = formData;
    let isValid = true;
    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      photo:"",
      role:""
    };

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Invalid email address";
      isValid = false;
    }

    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    console.log("Validation Errors:", newErrors);

    setErrors(newErrors);

    if (!isValid) {
      console.log("Validation failed");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/signup",
        {
          name,
          email,
          password,
          photo,
          role
        }
      );
      setUser(response.data); // Store user data in context
      console.log("Sign-up successful!", response.data);
      navigate("/");
    } catch (error) {
      console.error("Sign-up failed!", error);
      setErrors((prev) => ({
        ...prev,
        formError: error.response
          ? error.response.data.message
          : "An unknown error occurred",
      }));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = formData;
    const newErrors = { email: "", password: "" };

    if (!password) {
      newErrors.password = "Password is required";
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/login",
        {
          email,
          password,
        }
      );
      setUser(response.data); // Store user data in context
      console.log("Login successful!", response.data);
      navigate("/");
    } catch (error) {
      console.error("Login failed!", error);
      setErrors((prev) => ({
        ...prev,
        formError: error.response.data.message || "An error occurred",
      }));
    }
  };

  return (
    <>
      <Nav />
      <div className="signin-main">
        <span className="signin-options">
          <i class="fa-solid fa-user-tie fa-xl" onClick={() => {
            handleOptionsSignIn('admin')
          }}></i>
          <i class="fa-solid fa-user fa-xl" onClick={() => {
            handleOptionsSignIn('user')
          }}></i>
        </span>
        <div className="signin-body">
          {
            showUserIn ? <form onSubmit={handleLogin}>
              <h3>Sign in as a User!</h3>
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              {errors.password && (
                <p style={{ color: "red", fontWeight: "bold", fontSize: 12 }}>
                  {errors.password}
                </p>
              )}
              <button type="submit">Sign In</button>
              <span className="signin-other">
                <a href="#">Forgot your password?</a>
                <Link onClick={() => {
                  setSignUpState(!signUpState);
                  // You can add a check here to prevent default behavior if signUpState is true
                }}>Sign Up First!</Link>
              </span>
            </form>
              : null
          }
          {
            showAdminIn ?
              <form onSubmit={handleLogin}>
                <h3>Sign in as a Admin!</h3>
                <input
                  type="email"
                  placeholder="Email"
                />
                <input
                  type="password"
                  placeholder="Password"
                />
                {errors.password && (
                  <p style={{ color: "red", fontWeight: "bold", fontSize: 12 }}>
                    {errors.password}
                  </p>
                )}
                <button type="submit">Sign In</button>
                <span className="signin-other">
                  <a href="#">Forgot your password?</a>
                  <Link onClick={() => {
                    setSignUpState(!signUpState);
                    // You can add a check here to prevent default behavior if signUpState is true
                  }}>Sign Up First!</Link>
                </span>
              </form>
              : null
          }
        </div>
        {signUpState ?
          <>
            <div className="signup-popup">
              <span className="signup-exit">
                <i class="fa-solid fa-x" onClick={() => {
                  setSignUpState(false)
                }}></i>
              </span>
              <span className="signup-options">
                <i class="fa-solid fa-user-tie fa-xl" onClick={() => {
                  handleOptionsSignUp('admin')
                }}></i>
                <i class="fa-solid fa-user fa-xl" onClick={() => {
                  handleOptionsSignUp('user')
                }}></i>
              </span>
              <div className="signup-body">
                {
                  showUserUp ? <form onSubmit={handleSignUp}>
                    <h3>Sign up as a User!</h3>
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({ ...formData, confirmPassword: e.target.value })
                      }
                    />
                    {errors.password && (
                      <p style={{ color: "red", fontWeight: "bold", fontSize: 12 }}>
                        {errors.password}
                      </p>
                    )}
                    <button type="submit">Sign Up</button>
                  </form>
                    : null
                }
                {
                  showAdminUp ?
                    <form onSubmit={handleSignUp}>
                      <h3>Sign up as a Admin!</h3>
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                      <input
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                      />
                      <input
                        type="password"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          setFormData({ ...formData, confirmPassword: e.target.value })
                        }
                      />
                      {errors.password && (
                        <p style={{ color: "red", fontWeight: "bold", fontSize: 12 }}>
                          {errors.password}
                        </p>
                      )}
                      <button type="submit">Sign Up</button>
                    </form>
                    : null
                }
              </div>
            </div>
            <div className="signup-overlay"></div>
          </>
          : null}
        <Footer name='footer-signin' />
      </div>


    </>
  );
}
