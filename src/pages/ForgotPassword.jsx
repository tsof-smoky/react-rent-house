import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { forgotPassword } from "../redux/Action/UserAction";

export default function ForgotPassword() {
  const [input, setInput] = useState({
    email: "",
  });

  const dispatch = useDispatch();
  const { error, message } = useSelector((state) => state.userForgotPassword);

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

  const handleSubmit = () => {
    dispatch(forgotPassword(input.email));
  };

  return (
    <div className="mt-[30px]">
      <ToastContainer autoClose={3000} />
      <input
        type="email"
        placeholder="Email"
        className="input input-bordered w-full bg-[#D3EBFB]"
        name="email"
        onChange={handleChangeInput}
      />

      <button
        className="btn bg-[#B6E2D3] mr-[20px] mt-[50px]"
        onClick={handleSubmit}
      >
        Gửi link thiết lập mật khẩu
      </button>
    </div>
  );
}
