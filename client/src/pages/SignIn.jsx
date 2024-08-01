import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //setLoading(true); // make loading true before request
      dispatch(signInStart());
      const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success === false) {
        dispatch(signInFailure(error.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7"><span className="text-orange-500">Sign</span> In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        <input
          type="email"
          name="email"
          onChange={handleChange}
          className="p-3 rounded-lg border focus:outline-orange-500"
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          className="p-3 rounded-lg border focus:outline-orange-500"
          placeholder="Password"
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-slate-700 hover:opacity-95 disabled:opacity-80 text-white p-3 rounded-lg"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
       <OAuth/>

       
      </form>
      <div className="flex gap-2 mt-3">
        <p className="">Dont have an account?</p>
        <Link to="/sign-up">
          <p className="text-blue-600">Sign Up</p>
        </Link>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
