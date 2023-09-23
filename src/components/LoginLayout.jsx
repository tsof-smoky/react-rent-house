import { Link } from "react-router-dom";

export default function LoginLayout({ children }) {
  return (
    <div className="grid grid-cols-2 w-[1000px] my-[100px] mx-auto shadow-xl">
      <div>
        <img className="h-full" src="/images/login-img.png" alt="" />
      </div>
      <div className="text-center p-[30px]">
        <img
          className="h-[100px] mx-auto"
          src="images/logo.png"
          alt=""
          srcset=""
        />
        <div className="mt-[20px]">
          <Link to="/login">
            <button className="btn btn-warning mr-[20px]">Đăng nhập</button>
          </Link>
          <Link to="/register">
            <button className="btn btn-warning">Đăng ký</button>
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
