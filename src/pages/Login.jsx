import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

import { login } from "../redux/Action/UserAction";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [isRemember, setIsRemember] = useState(false);
  const [showPass, setShowPass] = useState(false);
  
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    setIsRemember(
      JSON.parse(localStorage.getItem("renthouse-isremember")) || false
    );

    const savedEmail = localStorage.getItem("renthouse-email") || "";
    const savedPassword = localStorage.getItem("renthouse-password") || "";
    setInput({
      email: savedEmail,
      password: savedPassword,
    });
    emailRef.current.value = savedEmail;
    passwordRef.current.value = savedPassword;
  }, []);

  const handleChangeInput = (e) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleRemember = () => {
    setIsRemember(!isRemember);
    localStorage.setItem("renthouse-isremember", !isRemember);
    if (isRemember) {
      localStorage.setItem("renthouse-email", "");
      localStorage.setItem("renthouse-password", "");
    }
  };

  const handleLogin = () => {
    if (isRemember) {
      localStorage.setItem("renthouse-email", input.email);
      localStorage.setItem("renthouse-password", input.password);
    }
    dispatch(login(input.email, input.password));
  };

  return (
    <div className="mt-[30px]">
      <ToastContainer autoClose={3000} />
      <input
        type="email"
        placeholder="Email"
        className="input input-bordered w-full bg-[#D3EBFB]"
        name="email"
        ref={emailRef}
        onChange={handleChangeInput}
      />
      <div className="flex items-center mt-[20px] w-full rounded-lg bg-[#EAE2F9]">
        <input
          type={showPass ? "text" : "password"}
          placeholder="Mật khẩu"
          name="password"
          className="bg-[#EAE2F9] w-full py-[12px] pl-[16px] rounded-lg"
          ref={passwordRef}
          onChange={handleChangeInput}
        />
        <FontAwesomeIcon
          icon={showPass ? faEye : faEyeSlash}
          className="h-[20px] mx-[10px]"
          onClick={() => setShowPass(!showPass)}
        />
      </div>

      <div className="flex justify-between items-center mt-[20px]">
        <div className="form-control">
          <label className="label cursor-pointer">
            <input
              type="checkbox"
              className="checkbox checkbox-primary mr-[10px]"
              checked={isRemember}
              onChange={handleRemember}
            />
            <span className="label-text">Ghi nhớ tài khoản</span>
          </label>
        </div>
        <Link to="/forgotpassword">
          <p className="link link-primary">Quên mật khẩu</p>
        </Link>
      </div>

      <button
        className="btn bg-[#B6E2D3] mr-[20px] mt-[50px]"
        onClick={handleLogin}
      >
        Đăng nhập
      </button>
    </div>
  );
}
