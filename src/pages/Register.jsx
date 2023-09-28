import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { register } from "../redux/Action/UserAction";

export default function Register() {
  const [input, setInput] = useState({
    email: "",
    fullName: "",
    password: "",
    passwordConfirm: "",
  });

  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.userRegister);

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

  const handleRegister = () => {
    dispatch(
      register(
        input.email,
        input.fullName,
        input.password,
        input.passwordConfirm
      )
    );
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
        type="text"
        placeholder="Họ tên"
        className="input input-bordered w-full mt-[20px]"
        name="fullName"
        onChange={handleChangeInput}
      />
      <input
        type="password"
        placeholder="Mật khẩu"
        className="input input-bordered w-full mt-[20px]"
        name="password"
        onChange={handleChangeInput}
      />
      <input
        type="password"
        placeholder="Nhập lại mật khẩu"
        className="input input-bordered w-full mt-[20px]"
        name="passwordConfirm"
        onChange={handleChangeInput}
      />
      <button
        className="btn btn-warning mr-[20px] mt-[20px]"
        onClick={handleRegister}
      >
        Đăng ký
      </button>
    </div>
  );
}
