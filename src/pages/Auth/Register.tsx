import { useState } from "react";
import axiosInstance from "../../Api/axiosInstance";
import authImg from "../../assets/login.jpg";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("auth/register", form);
      setMsg(res.data.message);
    } catch (err: any) {
      setMsg(err.response?.data?.message || "Error occurred");
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
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>تسجيل مستخدم جديد</h2>

          <input
            name="username"
            type="text"
            placeholder="اسم المستخدم"
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="البريد الالكتروني"
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="كلمة المرور"
            onChange={handleChange}
            required
          />
          <button type="submit">تسجيل</button>
        </form>
      </div>
      {msg && <p>{msg}</p>}
    </div>
  );
};

export default Register;
