import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";

function AdminLayout({ children }) {
  const location = useLocation();
  const [show, setShow] = useState(true);
  const feedData = [
    {
      title: "Quản lý người dùng",
      link: "/admin",
    },
    {
      title: "Quản lý phòng",
      link: "/admin/house",
    },
    {
      title: "Quản lý yêu cầu về phòng ",
      link: "/admin/houserequest",
    },
    {
      title: "Quản lý yêu cầu về bạn cùng phòng",
      link: "/admin/roommaterequest",
    },
  ];
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
          <FontAwesomeIcon icon={faUser} />
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
