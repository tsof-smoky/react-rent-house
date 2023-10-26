import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faCompass, faCouch, faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HouseCard from "../components/HouseCard";
import { getHouseDetail, getHouseList } from "../redux/Action/HouseAction";
import { createHouseBooking } from "../redux/Action/HouseBookingAction";
import { formatCurrency } from "../core/helpers/string";

export default function HouseDetail() {
    const { houseId } = useParams();
    const dispatch = useDispatch();
    const emailRef = useRef();
    const fullNameRef = useRef();
    const phoneRef = useRef();
    const messageRef = useRef();
    const user = useSelector((state) => state.userLogin)?.user?.data;
    const { house } = useSelector((state) => state.houseDetail);
    const { houses } = useSelector((state) => state.houseList);
    const { message, error } = useSelector((state) => state.houseBookingCreate);
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
    }, [houseId]);

    useEffect(() => {
        if (houses) {
            const randomNum = Math.random() * (houses?.length - 3);
            setHouseList(houses.slice(randomNum, randomNum + 3));
        }
    }, [houses, houseId]);

    useEffect(() => {
        if (house) {
            setHouseDetail(house);
        }
    }, [house]);

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

    const handleChangeInput = (e) => {
        setInput((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const handleOpenImgModal = () => {
        document.getElementById("my_modal_2").showModal();
    };

    const handleBookHome = () => {
        if (user) dispatch(createHouseBooking(input.email, input.fullName, input.phone, input.message, houseId));
        else window.location.href = "/login";
    };

    return (
        <div>
            <ToastContainer autoClose={3000} />
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <h3 className="text-lg font-bold">Toàn bộ ảnh</h3>
                    <div>
                        {houseDetail.picture?.map(({ fileLink }, index) => (
                            <img src={fileLink} key={index} alt="" className="my-[15px]" />
                        ))}
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
            <div className="grid grid-cols-12 gap-10 px-[100px] my-[50px]">
                <div className="col-span-7">
                    <img src={houseDetail.picture && houseDetail.picture[0].fileLink} alt="" className="max-h-[1000px] mx-auto" />
                </div>
                <div className="col-span-5">
                    <div className="bg-[#E1F2FF] p-[30px]">
                        <div className="text-[30px] underline ">Đặt lịch xem nhà</div>
                        <input
                            type="text"
                            placeholder="Họ tên"
                            className="input input-bordered w-full mt-[30px]"
                            name="fullName"
                            ref={fullNameRef}
                            onChange={handleChangeInput}
                        />
                        <input
                            type="text"
                            placeholder="Số điện thoại"
                            className="input input-bordered w-full mt-[20px]"
                            name="phone"
                            ref={phoneRef}
                            onChange={handleChangeInput}
                        />{" "}
                        <input
                            type="email"
                            placeholder="Email"
                            className="input input-bordered w-full mt-[20px]"
                            name="email"
                            ref={emailRef}
                            onChange={handleChangeInput}
                        />{" "}
                        <textarea
                            className="textarea textarea-bordered w-full mt-[20px]"
                            placeholder="Lời nhắn"
                            name="message"
                            ref={messageRef}
                            onChange={handleChangeInput}
                        ></textarea>
                        <button className="btn bg-[#89CBFF] w-full mt-[20px] rounded-[20px]" onClick={handleBookHome}>
                            GỬI NGAY
                        </button>
                    </div>
                    <button className="btn bg-[#FBDDDB] w-full mt-[50px] rounded-[20px]" onClick={handleOpenImgModal}>
                        XEM TOÀN BỘ ẢNH
                    </button>
                </div>
            </div>
            <div className="bg-[#F5F5F5] px-[100px] py-[20px]">
                <div className="grid grid-cols-12 gap-10">
                    <div className="col-span-7">
                        <div className="flex justify-between ">
                            <div className="bg-white flex p-[10px]">
                                <div className="flex items-center mr-[40px]">
                                    <FontAwesomeIcon className="text-[25px] mr-[10px]" icon={faBed} />
                                    {houseDetail.type}
                                </div>
                                <div className="flex items-center">
                                    <FontAwesomeIcon className="text-[25px] mr-[10px]" icon={faCompass} />
                                    {houseDetail.homeDirection}
                                </div>
                            </div>
                            <div>
                                <FontAwesomeIcon className="text-[30px]" icon={faHeart} />
                            </div>
                        </div>
                        <div className="text-left mt-[50px]">
                            <div className="text-[30px] font-semibold">{houseDetail.name}</div>
                            <div>Giá thuê: {formatCurrency(houseDetail.price)}/tháng</div>
                            <div>
                                Nội thất: {houseDetail.furniture === 0 ? "Không nội thất" : houseDetail.furniture === 1 ? "Một phần" : "Đầy đủ"}
                            </div>
                            <div>Lưu ý: {houseDetail.note}</div>
                            <hr className="bg-black h-[2px] my-[10px]" />
                            {houseDetail.description?.split("\n").map((line, index) => (
                                <div key={index}>{line}</div>
                            ))}
                        </div>
                    </div>

                    <div className="col-span-5 px-[50px]">
                        <div className="bg-white text-left p-[20px]">
                            <p className="font-bold text-[20px] mb-[20px]">ĐẶC ĐIỂM BẤT ĐỘNG SẢN</p>
                            <hr className="my-[10px]" />
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <FontAwesomeIcon className="text-[25px] mr-[10px]" icon={faBed} />
                                    Phòng ngủ
                                </div>
                                <p className="text-blue-600">{houseDetail.type}</p>
                            </div>
                            <hr className="my-[10px]" />
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <FontAwesomeIcon className="text-[25px] mr-[10px]" icon={faCouch} />
                                    Nội thất
                                </div>
                                <p className="text-blue-600">
                                    {" "}
                                    {houseDetail.furniture === 0 ? "Không nội thất" : houseDetail.furniture === 1 ? "Một phần" : "Đầy đủ"}
                                </p>
                            </div>
                            <hr className="my-[10px]" />
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <FontAwesomeIcon className="text-[25px] mr-[10px]" icon={faLocationArrow} />
                                    Hướng nhà
                                </div>
                                <p className="text-blue-600">{houseDetail.homeDirection}</p>
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
                                picture={house.picture}
                                key={index}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
