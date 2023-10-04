import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVectorSquare,
  faBed,
  faBath,
  faCompass,
  faCouch,
  faLocationArrow,
  faFileLines,
  faCircleHalfStroke,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

import HouseCard from "../components/HouseCard";
import { getHouseDetail, getHouseList } from "../redux/Action/HouseAction";
import { createHouseBooking } from "../redux/Action/HouseBookingAction";

export default function HouseDetail() {
  const { houseId } = useParams();
  const dispatch = useDispatch();
  const { house } = useSelector((state) => state.houseDetail);
  const { houses } = useSelector((state) => state.houseList);
  const [houseList, setHouseList] = useState([]);
  const [houseDetail, setHouseDetail] = useState({});
  const [input, setInput] = useState({
    email: "",
    fullName: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    dispatch(getHouseDetail(houseId));
    if (!houses) {
      dispatch(getHouseList());
    }
  }, []);

  useEffect(() => {
    if (houses) {
      setHouseList(houses.filter((el) => el._id !== houseId).slice(0, 3));
    }
  }, [houses]);

  useEffect(() => {
    if (house) {
      console.log(house);
      setHouseDetail(house);
    }
  }, [house]);

  const handleChangeInput = (e) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleBookHome = () => {
    dispatch(
      createHouseBooking(
        input.email,
        input.fullName,
        input.phone,
        input.message,
        houseId
      )
    );
  };

  return (
    <div>
      <div className="grid grid-cols-12 gap-10 px-[100px] my-[50px]">
        <div className="col-span-7">
          <img src={houseDetail.pictureLink} alt="" className="w-full" />
          {/* <div className="grid grid-cols-3 gap-5 mt-[20px]">
            <div>
              <img src="/images/house-img.png" alt="" />
            </div>
            <div>
              <img src="/images/house-img.png" alt="" />
            </div>
            <div>
              <img src="/images/house-img.png" alt="" />
            </div>
          </div> */}
        </div>
        <div className="col-span-5">
          <div className="bg-[#E1F2FF] p-[30px]">
            <div className="text-[30px] underline ">Đặt lịch xem nhà</div>
            <input
              type="text"
              placeholder="Họ tên"
              className="input input-bordered w-full mt-[30px]"
              name="fullName"
              onChange={handleChangeInput}
            />
            <input
              type="text"
              placeholder="Số điện thoại"
              className="input input-bordered w-full mt-[20px]"
              name="phone"
              onChange={handleChangeInput}
            />{" "}
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full mt-[20px]"
              name="email"
              onChange={handleChangeInput}
            />{" "}
            <textarea
              className="textarea textarea-bordered w-full mt-[20px]"
              placeholder="Lời nhắn"
              name="message"
              onChange={handleChangeInput}
            ></textarea>
            <button
              className="btn bg-[#89CBFF] w-full mt-[20px] rounded-[20px]"
              onClick={handleBookHome}
            >
              GỬI NGAY
            </button>
          </div>
        </div>
      </div>
      <div className="bg-[#F5F5F5] px-[100px] py-[20px]">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-7">
            <div className=" flex justify-between">
              <div className="bg-white flex p-[10px]">
                <div className="flex items-center mr-[40px]">
                  <FontAwesomeIcon
                    className="text-[25px] mr-[10px]"
                    icon={faVectorSquare}
                  />
                  null
                </div>
                <div className="flex items-center mr-[40px]">
                  <FontAwesomeIcon
                    className="text-[25px] mr-[10px]"
                    icon={faBed}
                  />
                  {houseDetail.type}
                </div>
                <div className="flex items-center mr-[40px]">
                  <FontAwesomeIcon
                    className="text-[25px] mr-[10px]"
                    icon={faBath}
                  />
                  null
                </div>
                <div className="flex items-center">
                  <FontAwesomeIcon
                    className="text-[25px] mr-[10px]"
                    icon={faCompass}
                  />
                  {houseDetail.homeDirection}
                </div>
              </div>
              <div>
                <FontAwesomeIcon className="text-[30px]" icon={faHeart} />
              </div>
            </div>
            <div className="text-left mt-[50px]">
              <div className="text-[30px] font-semibold">
                {houseDetail.name}
              </div>
              <div>Diện tích: null</div>
              <div>Giá thuê: {houseDetail.price}đ/tháng</div>
              <div>Cọc: {houseDetail.deposit}</div>
              <div>
                Nội thất:{" "}
                {houseDetail.furniture === 0
                  ? "Không nội thất"
                  : houseDetail.furniture === 1
                  ? "Một phần"
                  : "Đầy đủ"}
              </div>
              <hr className="bg-black h-[2px] my-[10px]" />
              {houseDetail.description?.split("\n").map((line, index) => (
                <div key={index}>{line}</div>
              ))}
              {/* Tiện ích tại Vinhomes Grand Park “Một bước chân ngàn tiện ích”:
              <ul className="list-disc ml-[30px]">
                <li>Phí quản lý 8.800đ /m2</li>
                <li>Gởi xe 1.250.000đ/oto – 150.000đ/xe máy</li>
                <li>Phí điện, nước được niêm yết theo giá của Nhà nước.</li>
                <li>Tầng hầm giữ xe (bao gồm tầng hầm xe máy B1, ô tô B2)</li>
                <li>Hồ bơi, sân bóng đá, bóng bàn, bóng chuyền,…</li>
                <li>Đại công viên 36ha</li>
                <li>Hệ thống siêu thị, cà phê tại Shophouse</li>
                <li>Trường học liên cấp Vinschool</li>
                <li>Trung tâm thương mại Vincom Mega Mall rộng 5.000 m2</li>
                <li>Chợ đêm Vinhomes Grand Park.</li>
              </ul> */}
            </div>
          </div>

          <div className="col-span-5 px-[50px]">
            <div className="bg-white text-left p-[20px]">
              <p className="font-bold text-[20px] mb-[20px]">
                ĐẶC ĐIỂM BẤT ĐỘNG SẢN
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FontAwesomeIcon
                    className="text-[25px] mr-[10px]"
                    icon={faVectorSquare}
                  />
                  Diện tích
                </div>
                <p className="text-blue-600">null</p>
              </div>
              <hr className="my-[10px]" />
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FontAwesomeIcon
                    className="text-[25px] mr-[10px]"
                    icon={faBed}
                  />
                  Phòng ngủ
                </div>
                <p className="text-blue-600">{houseDetail.type}</p>
              </div>
              <hr className="my-[10px]" />
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FontAwesomeIcon
                    className="text-[25px] mr-[10px]"
                    icon={faBath}
                  />
                  Phòng tắm/WC
                </div>
                <p className="text-blue-600">null</p>
              </div>
              <hr className="my-[10px]" />
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FontAwesomeIcon
                    className="text-[25px] mr-[10px]"
                    icon={faCouch}
                  />
                  Nội thất
                </div>
                <p className="text-blue-600">
                  {" "}
                  {houseDetail.furniture === 0
                    ? "Không nội thất"
                    : houseDetail.furniture === 1
                    ? "Một phần"
                    : "Đầy đủ"}
                </p>
              </div>
              <hr className="my-[10px]" />
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FontAwesomeIcon
                    className="text-[25px] mr-[10px]"
                    icon={faLocationArrow}
                  />
                  Hướng nhà
                </div>
                <p className="text-blue-600">{houseDetail.homeDirection}</p>
              </div>
              <hr className="my-[10px]" />
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FontAwesomeIcon
                    className="text-[25px] mr-[10px]"
                    icon={faLocationArrow}
                  />
                  Hướng ban công
                </div>
                <p className="text-blue-600">{houseDetail.balconyDirection}</p>
              </div>
              <hr className="my-[10px]" />
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FontAwesomeIcon
                    className="text-[25px] mr-[10px]"
                    icon={faFileLines}
                  />
                  Pháp lý
                </div>
                <p className="text-blue-600">{houseDetail.juridical}</p>
              </div>
              <hr className="my-[10px]" />
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FontAwesomeIcon
                    className="text-[25px] mr-[10px]"
                    icon={faCircleHalfStroke}
                  />
                  Đặc điểm
                </div>
                <p className="text-blue-600">{houseDetail.feature}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-left my-[40px]">
          <p className="text-[25px]">Xem thêm những sản phẩm khác</p>
          <div className="my-[30px] grid grid-cols-3 mx-[100px] gap-10">
            {houseList?.map((house, index) => (
              <HouseCard
                id={house._id}
                name={house.name}
                area="null"
                price={house.price}
                furniture={house.furniture}
                pictureLink={house.pictureLink}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
