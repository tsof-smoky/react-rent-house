import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import Tippy from "@tippyjs/react/headless";

import { logout } from "../redux/Action/UserAction";

function AdminLayout({ children }) {
  const location = useLocation();
  const [show, setShow] = useState(true);
  const feedData = [
    {
      title: "Quản lý người dùng",
      link: "/",
    },
    {
      title: "Quản lý phòng",
      link: "/house",
    },
    {
      title: "Quản lý yêu cầu xem phòng ",
      link: "/housebooking",
    },
    {
      title: "Quản lý yêu cầu tìm bạn cùng phòng",
      link: "/order",
    },
  ];

  const dispath = useDispatch();

  const handleLogout = () => {
    dispath(logout());
  };
  return (
    <>
      <div className="bg-[#F8E3AF] h-[100px] flex items-center justify-between pl-[50px] pr-[100px] fixed w-full min-w-[1200px] z-50">
        <div className="flex items-center">
          <button className="mr-[70px]" onClick={() => setShow(!show)}>
            <FontAwesomeIcon icon={faBars} className="h-[30px]" />
          </button>
          <Link to="/admin">
            <div className="flex items-center">
              <img src="/images/logo.png" className="h-[80px]" alt="" />
              <p className="text-[30px] ml-[10px] font-semibold">Admin</p>
            </div>
          </Link>
        </div>
        <div className="text-[30px]">
          <Tippy
            interactive
            delay={[0, 700]}
            offset={[0, 12]}
            placement="bottom-end"
            theme="light-border"
            trigger="click"
            render={(attrs) => (
              <div className="rounded-xl px-[10px] py-[20px] flex flex-col shadow-4xl bg-white">
                <div className="flex">
                  <img
                    className="rounded-full h-[30px]"
                    src="/images/user-img.png"
                    alt=""
                  />
                  <div className="font-semibold italic text-[18px] ml-[10px]">
                    Admin
                  </div>
                </div>
                <hr className="mt-[15px]" />
                <div tabIndex="-1" className="text-[16px]">
                  <div
                    className="flex items-center hover:bg-[#cac9c9] p-[10px] rounded-lg"
                    onClick={handleLogout}
                  >
                    <button className="rounded-none bg-inherit hover:bg-[#cac9c9] text-black">
                      Log out
                    </button>
                  </div>
                </div>
              </div>
            )}
          >
            <FontAwesomeIcon icon={faUser} />
          </Tippy>
        </div>
      </div>
      <div className="min-h-[calc(100vh_-_0px)] flex pt-[100px]">
        <div
          className={`leftside bg-white w-[350px] min-h-full pt-[20px] + ${
            show ? "block " : "hidden"
          }`}
        >
          <ul className="px-[15px] text-left">
            {feedData.map((feed, index) => (
              <Link to={feed.link} key={index}>
                <li
                  className={`cursor-pointer py-[15px] px-[20px] + ${
                    location.pathname === feed.link
                      ? "bg-[#FFD700] rounded-lg font-bold"
                      : ""
                  }`}
                >
                  <span>{feed.title}</span>
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <div className="bg-[#f5f6ff] flex flex-col flex-auto px-[50px] py-[10px]">
          {children}
        </div>
      </div>
    </>
  );
}

export default AdminLayout;
