import { useRef, useState } from "react";
import axiosClient from "../utils/axios";
import { login as loginAction } from "../features/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";

function Login() {
  const dispatch = useDispatch();
  const login = useRef();
  const password = useRef();
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = login.current.value;
    const userPassword = password.current.value;

    if (!username || !userPassword) {
      setError("Iltimos, barcha maydonlarni to'ldiring....");
      return;
    }

    axiosClient
      .post("/auth/login", {
        username,
        password: userPassword,
      })
      .then((data) => dispatch(loginAction(data.data)))
      .catch(() => setError("Login muvaffaqiyatsiz. Iltimos, qayta urinib ko'ring."));
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-r from-teal-800 via-teal-800 to-teal-800 opacity-80"></div>
      <div className="relative bg-white bg-opacity-90 p-12 rounded-3xl shadow-2xl max-w-md w-full sm:w-3/4 lg:w-1/2 border border-gray-300 hover:shadow-2xl transition-shadow duration-300 ease-in-out">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-teal-500">
          Login
        </h2>
        {error && (
          <div className="mb-4 text-red-600 font-semibold text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="relative">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Username
            </label>
            <div className="flex items-center border border-gray-300 rounded-xl p-4 bg-gray-50">
              <FaUser className="text-teal-500 mr-3 text-lg" />
              <input
                className="w-full outline-none bg-transparent focus:ring-0"
                type="text"
                ref={login}
                placeholder="Enter your username"
              />
            </div>
          </div>
          <div className="relative">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-xl p-4 bg-gray-50">
              <FaLock className="text-teal-500 mr-3 text-lg" />
              <input
                className="w-full outline-none bg-transparent focus:ring-0"
                type="password"
                ref={password}
                placeholder="Enter your password"
              />
            </div>
          </div>
          <button className="w-full bg-teal-500 text-white p-4 rounded-xl font-bold hover:bg-teal-600 transition duration-300 ease-in-out transform hover:scale-105">
            Submit
          </button>
        </form>
        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-teal-500 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
