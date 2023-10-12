import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { resetPassword } from "../redux/Action/UserAction";

export default function Register() {
  const { email, resetToken } = useParams();
  const [input, setInput] = useState({
    password: "",
    passwordConfirm: "",
  });
  console.log(email, resetToken);

  const dispatch = useDispatch();
  const { message, error } = useSelector((state) => state.userResetPassword);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (message) {
      toast.success(message);
    }
  }, [error, message]);

  const handleChangeInput = (e) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleResetPassword = () => {
    dispatch(
      resetPassword(email, resetToken, input.password, input.passwordConfirm)
    );
  };

  return (
    <div className="mt-[30px]">
      <ToastContainer autoClose={3000} />
      <input
        type="password"
        placeholder="Mật khẩu"
        className="input input-bordered w-full mt-[20px] bg-[#F8E3AF]"
        name="password"
        onChange={handleChangeInput}
      />
      <input
        type="password"
        placeholder="Nhập lại mật khẩu"
        className="input input-bordered w-full mt-[20px] bg-[#F9EED9]"
        name="passwordConfirm"
        onChange={handleChangeInput}
      />
      <button
        className="btn bg-[#FBDDDB] mr-[20px] mt-[50px]"
        onClick={handleResetPassword}
      >
        Đặt lại mật khẩu
      </button>
    </div>
  );
}
