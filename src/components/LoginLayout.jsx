import { Link } from "react-router-dom";
import { Analytics } from '@vercel/analytics/react';

export default function LoginLayout({ children }) {
  return (
    <>
    <div className="w-[1000px] my-[100px] mx-auto shadow-xl text-center p-[30px] bg-[#FFFEF5]">
      <img className="h-[100px] mx-auto" src="images/logo.png" alt="" />
      <div className="mt-[20px]">
        <Link to="/">
          <button className="btn bg-[#B6E2D3] mr-[100px]">Đăng nhập</button>
        </Link>
        <Link to="/register">
          <button className="btn bg-[#FBDDDB]">Đăng ký</button>
        </Link>
        <Analytics mode = {'production'}/>
        {children}
      </div>
    </div>
    </>
  );
}
