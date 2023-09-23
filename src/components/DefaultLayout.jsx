import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function DefaultLayout({ children }) {
  const location = useLocation();

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
      link: "/roommate",
    },
    {
      title: "Hỗ trợ",
      link: "/support",
    },
  ];
  return (
    <>
      <div className="bg-[#F8E3AF] h-[100px] flex items-center justify-between px-[100px] fixed w-full min-w-[1200px] z-50">
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
          <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-[50px]" />
          <FontAwesomeIcon icon={faUser} />
        </div>
      </div>
      <div className="pt-[100px]">{children}</div>
      <div className="bg-[url('../public/images/footer-img.png')] h-[600px] grid grid-cols-2 pt-[50px]">
        <div className="text-white pl-[100px]">
          <div className="text-left ml-[100px] text-[35px]">
            Thông tin liên hệ
          </div>
          <div className="text-left mt-[20px] text-[20px]">
            Hotline: 035 698 xxx <br /> Email: timnha@gmail.com <br />
            Website: www.timnha.com.vn <br /> Địa chỉ: Đường Nguyễn Xiển –
            P.Long Thạnh Mỹ <br /> – Quận 9 – Thủ Đức, TP.Hồ Chí Minh
          </div>
        </div>
        <div className="pr-[100px]">
          <div className="bg-white bg-opacity-60 p-[30px] rounded-[60px]">
            <div className="text-[35px]">Nhận thông tin</div>
            <input
              type="text"
              placeholder="Họ tên"
              className="input input-bordered w-full mt-[30px] rounded-[20px]"
            />
            <input
              type="text"
              placeholder="Số điện thoại"
              className="input input-bordered w-full mt-[20px] rounded-[20px]"
            />{" "}
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full mt-[20px] rounded-[20px]"
            />{" "}
            <textarea
              className="textarea textarea-bordered w-full mt-[20px] rounded-[20px]"
              placeholder="Lời nhắn"
            ></textarea>
            <button className="btn btn-warning w-full mt-[20px] rounded-[20px]">
              GỬI NGAY
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DefaultLayout;
