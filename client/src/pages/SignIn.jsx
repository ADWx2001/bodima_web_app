import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true); // make loading true before request
      const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success === false) {
        setErrors(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setErrors(null);
      navigate("/");
    } catch (error) {
      setLoading(false);
      setErrors(error.message);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        <input
          type="email"
          name="email"
          onChange={handleChange}
          className="p-3 rounded-lg border"
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          className="p-3 rounded-lg border"
          placeholder="Password"
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-slate-700 hover:opacity-95 disabled:opacity-80 text-white p-3 rounded-lg"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <button
          type="button"
          className="bg-rose-700 hover:opacity-95 disabled:opacity-80 text-white p-3 rounded-lg"
          onClick={() => {
            // Implement your Google sign-in logic here
          }}
        >
          Continue with Google
        </button>
      </form>
      <div className="flex gap-2 mt-3">
        <p className="">Dont have an account?</p>
        <Link to="/sign-up">
          <p className="text-blue-600">Sign Up</p>
        </Link>
      </div>
      {errors && <p className="text-red-500">{errors}</p>}
    </div>
  );
}
