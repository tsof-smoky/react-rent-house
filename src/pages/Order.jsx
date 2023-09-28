import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Order() {
  const [step, setStep] = useState(1);
  const [gender, setGender] = useState("Giới tính");
  const [birthDate, setBirthDate] = useState(new Date());
  const [frontCccd, setFrontCccd] = useState("");
  const [backCccd, setBackCccd] = useState("");
  const [avatar, setAvatar] = useState("");

  const fileToDataUri = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.readAsDataURL(file);
    });

  const handleUploadFrontCccd = (e) => {
    if (e.target.files[0])
      fileToDataUri(e.target.files[0]).then((url) => setFrontCccd(url));
    else setFrontCccd("");
  };

  const handleUploadBackCccd = (e) => {
    if (e.target.files[0])
      fileToDataUri(e.target.files[0]).then((url) => setBackCccd(url));
    else setBackCccd("");
  };

  const handleUploadAvatar = (e) => {
    if (e.target.files[0])
      fileToDataUri(e.target.files[0]).then((url) => setAvatar(url));
    else setAvatar("");
  };

  return (
    <div>
      <img src="/images/order-img.png" alt="" />
      {step === 1 ? (
        <div className="mx-[100px] my-[50px]">
          <span className="bg-[#E6DFF9] text-[30px] py-[10px] px-[30px] rounded-[20px]">
            Mong muốn của bạn:
          </span>
          <div className="grid grid-cols-2 bg-[#CFEAE1] my-[30px] py-[50px] px-[100px] gap-x-[200px] gap-y-[20px] rounded-[20px]">
            <div className="flex justify-between items-center">
              Giới tính{" "}
              <select className="select select-primary" value=""></select>
            </div>
            <div className="flex justify-between items-center">
              Đã có bao nhiêu người
              <select className="select select-primary" value=""></select>
            </div>
            <div className="flex justify-between items-center">
              Số lượng người
              <select className="select select-primary" value=""></select>
            </div>
            <div className="flex justify-between items-center">
              Khoảng giá
              <select className="select select-primary" value=""></select>
            </div>
            <div className="flex justify-between items-center">
              Loại căn
              <select className="select select-primary" value=""></select>
            </div>
            <div className="flex justify-between items-center">
              Nội thất tối thiểu
              <select className="select select-primary" value=""></select>
            </div>
          </div>
          <div className="text-right">
            <button
              className="btn bg-[#E3EFF8] rounded-[20px] px-[50px]"
              onClick={() => setStep(2)}
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
              />
              <select
                className="select select-primary w-full my-[50px] border-black bg-[#FFEAEA]"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option disabled>Giới tính</option>
                <option>Nam</option>
                <option>Nữ</option>
                <option>Khác</option>
              </select>
              <div className="w-full border border-black rounded-[10px] text-left mb-[50px] bg-[#FFEAEA]">
                <DatePicker
                  selected={birthDate}
                  onChange={(date) => setBirthDate(date)}
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
              <button className="btn bg-[#FFD700] rounded-[20px]">
                Hoàn thành
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
