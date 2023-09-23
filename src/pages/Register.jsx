import React from "react";
export default function Login() {
  return (
    <div className="mt-[30px]">
      <input
        type="email"
        placeholder="Email"
        className="input input-bordered w-full"
      />
      <input
        type="text"
        placeholder="Họ tên"
        className="input input-bordered w-full mt-[20px]"
      />
      <input
        type="password"
        placeholder="Mật khẩu"
        className="input input-bordered w-full mt-[20px]"
      />
      <input
        type="password"
        placeholder="Nhập lại mật khẩu"
        className="input input-bordered w-full mt-[20px]"
      />
      <button className="btn btn-warning mr-[20px] mt-[20px]">Đăng ký</button>
    </div>
  );
}
