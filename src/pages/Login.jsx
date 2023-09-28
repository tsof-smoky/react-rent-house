import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { login } from "../redux/Action/UserAction";

export default function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleChangeInput = (e) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleLogin = () => {
    dispatch(login(input.email, input.password));
  };

  return (
    <div className="mt-[30px]">
      <ToastContainer autoClose={3000} />
      <input
        type="email"
        placeholder="Email"
        className="input input-bordered w-full"
        name="email"
        onChange={handleChangeInput}
      />
      <input
        type="password"
        placeholder="Mật khẩu"
        className="input input-bordered w-full mt-[20px]"
        name="password"
        onChange={handleChangeInput}
      />
      <div className="flex justify-between items-center mt-[20px]">
        <div className="form-control">
          <label className="label cursor-pointer">
            <input
              type="checkbox"
              className="checkbox checkbox-primary mr-[10px]"
            />
            <span className="label-text">Ghi nhớ tài khoản</span>
          </label>
        </div>
        <Link to="/forgotpassword">
          <p className="link link-primary">Quên mật khẩu</p>
        </Link>
      </div>

      <button
        className="btn btn-warning mr-[20px] mt-[20px]"
        onClick={handleLogin}
      >
        Đăng nhập
      </button>
    </div>
  );
}
