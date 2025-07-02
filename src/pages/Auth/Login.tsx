import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../Api/axiosInstance";
import { toast } from "react-toastify";
import authImg from "../../assets/login.jpg";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const res = await axiosInstance.post("auth/login", { email, password });
    if (res.data.success) {
      toast.success(res.data.message);
      localStorage.setItem("aboda-shop-login", "true");
      navigate("/");
    } else {
      toast.error(res.data.message);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-left">
        <h1>أهلاً بك 👋</h1>
        <p>سجّل الدخول لإدارة متجرك بكل سهولة.</p>
        <img src={authImg} alt="login illustration" />
      </div>
      <div className="auth-right">
        <form className="auth-form" onSubmit={handleLogin}>
          <h2>تسجيل الدخول</h2>
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">دخول</button>
          <Link to="/register">تسجيل جديد</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
