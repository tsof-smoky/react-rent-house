import React from "react";
import { Link } from "react-router-dom";
export default function Login() {
  return (
    <div className="mt-[30px]">
      <input
        type="email"
        placeholder="Email"
        className="input input-bordered w-full"
      />
      <input
        type="password"
        placeholder="Mật khẩu"
        className="input input-bordered w-full mt-[20px]"
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

      <button className="btn btn-warning mr-[20px] mt-[20px]">Đăng nhập</button>
    </div>
  );
}
