import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { createOrder } from "../redux/Action/OrderAction";

export default function Order() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userLogin)?.user?.data;
  const { message, error } = useSelector((state) => state.orderCreate);
  const [step, setStep] = useState(1);
  const [input, setInput] = useState({
    gender: "Nam",
    currentPeopleNum: 1,
    homeType: "Studio",
    wantedPeopleNum: 1,
    minFurniture: 0,
    fullName: "",
    identityFront: "",
    identityBack: "",
    avatar: "",
    priceMin: 4000000,
    priceMax: 5000000,
    dateOfBirth: "",
  });
  const [birthDate, setBirthDate] = useState(new Date());
  const [frontCccd, setFrontCccd] = useState("");
  const [backCccd, setBackCccd] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    handleChangeDate(new Date());
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (message) {
      toast.success(message);
      setInput({
        gender: "Nam",
        currentPeopleNum: 1,
        homeType: "Studio",
        wantedPeopleNum: 1,
        minFurniture: 0,
        fullName: "",
        identityFront: "",
        identityBack: "",
        avatar: "",
        priceMin: 4000000,
        priceMax: 5000000,
        dateOfBirth: "",
      });
      setStep(1);
      handleChangeDate(new Date());
      setAvatar("");
      setFrontCccd("");
      setBackCccd("");
    }
  }, [error, message]);

  const handleChangeInput = (name) => (e) => {
    setInput((prev) => {
      return { ...prev, name: e.target.value };
    });
  };

  const handleChangePrice = (e) => {
    const prices = e.target.value.replaceAll("đ", "").split("-");
    setInput((prev) => {
      return { ...prev, priceMin: prices[0] * 1, priceMax: prices[1] * 1 };
    });
  };

  const handleNextStep = () => {
    if (user) setStep(2);
    else window.location.href = "/login";
  };

  const handleChangeDate = (date) => {
    setBirthDate(date);
    let objectDate = new Date(date);
    let day = objectDate.getDate();
    let month = objectDate.getMonth();
    let year = objectDate.getFullYear();
    setInput((prev) => {
      return { ...prev, dateOfBirth: `${day}/${month + 1}/${year}` };
    });
  };

  const fileToDataUri = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.readAsDataURL(file);
    });

  const handleUploadFrontCccd = (e) => {
    if (e.target.files[0]) {
      setInput((prev) => {
        return { ...prev, identityFront: e.target.files[0] };
      });
      fileToDataUri(e.target.files[0]).then((url) => setFrontCccd(url));
    } else setFrontCccd("");
  };

  const handleUploadBackCccd = (e) => {
    if (e.target.files[0]) {
      setInput((prev) => {
        return { ...prev, identityBack: e.target.files[0] };
      });
      fileToDataUri(e.target.files[0]).then((url) => setBackCccd(url));
    } else setBackCccd("");
  };

  const handleUploadAvatar = (e) => {
    if (e.target.files[0]) {
      setInput((prev) => {
        return { ...prev, avatar: e.target.files[0] };
      });
      fileToDataUri(e.target.files[0]).then((url) => setAvatar(url));
    } else setAvatar("");
  };

  const handleSubmit = () => {
    dispatch(createOrder(input));
  };

  return (
    <div>
      <ToastContainer autoClose={3000} />
      <img src="/images/order-img.png" alt="" />
      {step === 1 ? (
        <div className="mx-[100px] my-[50px]">
          <span className="bg-[#E6DFF9] text-[30px] py-[10px] px-[30px] rounded-[20px]">
            Mong muốn của bạn:
          </span>
          <div className="grid grid-cols-2 bg-[#CFEAE1] my-[30px] py-[50px] px-[100px] gap-x-[200px] gap-y-[20px] rounded-[20px]">
            <div className="flex justify-between items-center">
              Giới tính
              <select
                className="select select-primary"
                onChange={handleChangeInput("gender")}
              >
                <option>Nam</option>
                <option>Nữ</option>
                <option>Nam và Nữ</option>
              </select>
            </div>
            <div className="flex justify-between items-center">
              Đã có bao nhiêu người
              <select
                className="select select-primary"
                onChange={handleChangeInput("currentPeopleNum")}
              >
                {[...Array(6)].map((el, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-between items-center">
              Số lượng người
              <select
                className="select select-primary"
                onChange={handleChangeInput("wantedPeopleNum")}
              >
                {[...Array(6)].map((el, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-between items-center">
              Khoảng giá
              <select
                className="select select-primary"
                onChange={handleChangePrice}
              >
                {[...Array(6)].map((el, i) => (
                  <option key={i}>{`${(i + 4) * 1000000}đ-${
                    (i + 5) * 1000000
                  }đ`}</option>
                ))}
                <option>{"10000000đ-50000000đ"}</option>
              </select>
            </div>
            <div className="flex justify-between items-center">
              Loại căn
              <select
                className="select select-primary"
                onChange={handleChangeInput("homeType")}
              >
                <option>Studio</option>
                <option>1 phòng ngủ</option>
                <option>2 phòng ngủ</option>
                <option>3 phòng ngủ</option>
              </select>
            </div>
            <div className="flex justify-between items-center">
              Nội thất tối thiểu
              <select
                className="select select-primary"
                onChange={handleChangeInput("minFurniture")}
              >
                <option value={0}>Không nội thất</option>
                <option value={1}>Nội thất một phần</option>
                <option value={2}>Nội thất đầy đủ</option>
              </select>
            </div>
          </div>
          <div className="text-right">
            <button
              className="btn bg-[#E3EFF8] rounded-[20px] px-[50px]"
              onClick={handleNextStep}
            >
              Tiếp theo
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="mx-[100px] my-[50px]">
            <div className="bg-[#FFFEF5] my-[30px] py-[50px] px-[100px] rounded-[20px]">
              <span className="bg-[#C9E7FC] text-[30px] py-[10px] px-[30px] rounded-[20px]">
                Thông tin cá nhân
              </span>
              <input
                type="text"
                placeholder="Họ và tên"
                className="input input-bordered w-full mt-[50px] border-black bg-[#FFEAEA]"
                value={input.fullName}
                onChange={(e) =>
                  setInput({ ...input, fullName: e.target.value })
                }
              />
              <div className="w-full border border-black rounded-[10px] text-left mb-[50px] mt-[30px] bg-[#FFEAEA]">
                <DatePicker
                  selected={birthDate}
                  onChange={handleChangeDate}
                  className="w-full text-left rounded-[10px] py-[10px] pl-[20px]  bg-[#FFEAEA]"
                />
              </div>
              <span className="bg-[#C9E7FC] text-[30px] py-[10px] px-[30px] rounded-[20px]">
                Xác minh thông tin
              </span>
              <div className="grid grid-cols-2 gap-20 mt-[50px]">
                <div className="border border-black rounded-[20px] p-[20px]">
                  <div className="mb-[20px]">CMND/CCCD mặt trước</div>
                  <input
                    type="file"
                    className="file-input file-input-bordered  bg-[#FFEAEA] w-full max-w-xs"
                    accept="image/png, image/jpeg"
                    onChange={handleUploadFrontCccd}
                  />
                  {frontCccd ? (
                    <img src={frontCccd} alt="" className="mt-[20px]"></img>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="border border-black rounded-[20px] p-[20px]">
                  <div className="mb-[20px]">CMND/CCCD mặt sau</div>
                  <input
                    type="file"
                    className="file-input file-input-bordered  bg-[#FFEAEA] w-full max-w-xs"
                    accept="image/png, image/jpeg"
                    onChange={handleUploadBackCccd}
                  />
                  {backCccd ? (
                    <img src={backCccd} alt="" className="mt-[20px]"></img>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="border border-black rounded-[20px] p-[20px] mt-[30px] w-[40%] mx-auto">
                <div className="mb-[20px]">Hình ảnh hiện tại</div>
                <input
                  type="file"
                  className="file-input file-input-bordered  bg-[#FFEAEA] w-full max-w-xs"
                  accept="image/png, image/jpeg"
                  onChange={handleUploadAvatar}
                />
                {avatar ? (
                  <img src={avatar} alt="" className="mt-[20px]"></img>
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div className="text-right">
              <button
                className="btn bg-[#FFD700] rounded-[20px] px-[30px]"
                onClick={handleSubmit}
              >
                Hoàn thành
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
