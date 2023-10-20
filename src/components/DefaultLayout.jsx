import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import Tippy from "@tippyjs/react/headless";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Analytics } from '@vercel/analytics/react';

import { logout, sendFeedback } from "../redux/Action/UserAction";

function DefaultLayout({ children }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const emailRef = useRef();
  const fullNameRef = useRef();
  const phoneRef = useRef();
  const messageRef = useRef();
  const user = useSelector((state) => state.userLogin)?.user?.data;
  const { message, error } = useSelector((state) => state.userSendFeedback);
  const [input, setInput] = useState({
    email: "",
    fullName: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (message) {
      toast.success(message);
      setInput({
        email: "",
        fullName: "",
        phone: "",
        message: "",
      });
      emailRef.current.value = "";
      fullNameRef.current.value = "";
      phoneRef.current.value = "";
      messageRef.current.value = "";
    }
  }, [error, message]);

  const handleSendFeedback = () => {
    dispatch(
      sendFeedback(input.email, input.fullName, input.phone, input.message)
    );
  };

  const handleChangeInput = (e) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const feedData = [
    {
      title: "Về chúng tôi",
      link: "/",
    },
    {
      title: "Tìm nhà",
      link: "/house",
    },
    {
      title: "Tìm người ở ghép",
      link: "/order",
    },
    {
      title: "Hỗ trợ",
      link: "/support",
    },
  ];
  return (
    <>

      <ToastContainer autoClose={3000} />
      <div className="bg-[#fff5bc] h-[100px] flex items-center justify-between px-[100px] fixed w-full min-w-[1200px] z-50">
        <Link to="/">
          <img src="/images/logo.png" className="h-[80px]" alt="" />
        </Link>
        <ul className="flex">
          {feedData.map((feed, index) => (
            <Link to={feed.link} key={index}>
              <li
                className={`mx-[30px] ${
                  location.pathname === feed.link
                    ? "underline underline-offset-8"
                    : ""
                }`}
              >
                {feed.title}
              </li>
            </Link>
          ))}
        </ul>
        <div className="text-[30px]">
          {/* <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-[50px]" /> */}
          <Tippy
            interactive
            delay={[0, 700]}
            offset={[0, 12]}
            placement="bottom-end"
            theme="light-border"
            trigger="click"
            render={(attrs) => {
              if (user)
                return (
                  <div className="rounded-xl px-[10px] py-[20px] flex flex-col shadow-4xl bg-white">
                    <div className="flex">
                      <img
                        className="rounded-full h-[30px]"
                        src="/images/user-img.png"
                        alt=""
                      />
                      <div className="font-semibold italic text-[18px] ml-[10px]">
                        {user.name}
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
                );
              else
                return (
                  <div className="rounded-xl px-[10px] py-[20px] flex flex-col shadow-4xl bg-white">
                    <Link to="/login">
                      <div tabIndex="-1" className="text-[16px]">
                        <div className="flex items-center hover:bg-[#cac9c9] p-[10px] rounded-lg">
                          <button className="rounded-none bg-inherit hover:bg-[#cac9c9] text-black">
                            Log in
                          </button>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
            }}
          >
            <FontAwesomeIcon icon={faUser} />
          </Tippy>
        </div>
      </div>
      <Analytics mode = {'production'}/>
      <div className="pt-[100px]">{children}</div>
      <div className="bg-[url('../public/images/footer-img.png')] grid grid-cols-2 pt-[50px]">
        <div></div>
        <div className="pr-[100px]">
          <div className="bg-white bg-opacity-60 p-[30px] rounded-[60px]">
            <div className="text-[35px]">Nhận thông tin</div>
            <input
              type="text"
              placeholder="Họ tên"
              className="input input-bordered w-full mt-[30px] rounded-[20px] bg-[#FFEAE8]"
              name="fullName"
              ref={fullNameRef}
              onChange={handleChangeInput}
            />
            <input
              type="text"
              placeholder="Số điện thoại"
              className="input input-bordered w-full mt-[20px] rounded-[20px] bg-[#E6FFED]"
              name="phone"
              ref={phoneRef}
              onChange={handleChangeInput}
            />{" "}
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full mt-[20px] rounded-[20px] bg-[#EAE3FD]"
              name="email"
              ref={emailRef}
              onChange={handleChangeInput}
            />{" "}
            <textarea
              className="textarea textarea-bordered w-full mt-[20px] rounded-[20px] bg-[#E1F2FD]"
              placeholder="Lời nhắn"
              name="message"
              ref={messageRef}
              onChange={handleChangeInput}
            ></textarea>
            <button
              className="btn bg-[#FFDE87] px-[50px] mt-[20px] rounded-[20px]"
              onClick={handleSendFeedback}
            >
              GỬI NGAY
            </button>
            <div className="pl-[100px] mt-[50px] text-left text-[20px]">
              Hotline: 0963113949 <br /> Email: timnhauytin201@gmail.com
              <br />
              Facebook: https://www.facebook.com/timnhauytin201
              <br />
              Website: www.timnhauytin201.com.vn
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DefaultLayout;
