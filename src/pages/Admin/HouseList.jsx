import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrashCan,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

import {
  getHouseList,
  updateHouse,
  deleteHouse,
  createHouse,
} from "../../redux/Action/HouseAction";
import ModalContent, {
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "../../components/Modal/ModalContent";
import Button from "../../components/Button";
import OnChangeInput from "../../components/OnChangeInput";

export default function HouseList() {
  const dispatch = useDispatch();
  const { houses } = useSelector((state) => state.houseList);

  const [showViewHouseModal, setShowViewHouseModal] = useState(false);
  const [showCreateHouseModal, setShowCreateHouseModal] = useState(false);
  const [showUpdateHouseModal, setShowUpdateHouseModal] = useState(false);
  const [showDeleteHouseModal, setShowDeleteHouseModal] = useState(false);
  const [input, setInput] = useState({});
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (!houses) {
      dispatch(getHouseList());
    }
    console.log(houses);
  }, []);

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  useEffect(() => {
    console.log(files);
  }, [files]);

  const handeOpenCreateHouseModal = () => {
    setInput({
      name: "",
      type: "Studio",
      price: 0,
      note: "",
      homeDirection: "",
      furniture: "0",
      gender: "Nam",
      description: "",
      pictures: [],
      deposit: "",
      bedRoomNum: 0,
      bathRoomNum: 0,
      postStatus: 0,
    });
    setShowCreateHouseModal(true);
  };

  const handleCreateHouse = () => {
    dispatch(
      createHouse({
        ...input,
        pictures: [...files],
        furniture: input.furniture * 1,
        bedRoomNum: input.type[0] === "S" ? 0 : input.type[0] * 1,
      })
    );
    console.log(input);
  };

  const handeOpenShowHouseModal = (e) => {
    const index = houses.findIndex(
      (el) => e.currentTarget.dataset.index === el._id
    );
    setInput({ ...houses[index] });
    setShowViewHouseModal(true);
  };

  const handleOpenUpdateHouseModal = () => {
    setShowUpdateHouseModal(true);
  };

  const handleUpdateHouse = () => {};

  const handleOpenDeleteHouseModal = (e) => {
    const index = houses.findIndex(
      (el) => e.currentTarget.dataset.index === el._id
    );
    setInput({ ...houses[index] });
    setShowDeleteHouseModal(true);
  };

  const handleDeleteHouse = () => {};

  return (
    <div className="mt-[50px]">
      <div className="text-right">
        <Button
          bgColor="bg-[#FFD700]"
          tColor="text-black"
          title="Tạo mới thông tin nhà"
          cName="mr-[10px]"
          onClick={handeOpenCreateHouseModal}
        />
      </div>

      <table className="min-w-full bg-white mt-[30px] ">
        <thead className="border-collapse border">
          <tr>
            <th className="w-[5%] border text-center py-[15px] px-2  font-semibold text-sm">
              #
            </th>
            <th className="w-[25%] border text-center py-[15px] px-2 font-semibold text-sm">
              Tên
            </th>
            <th className="w-[20%] border text-center py-[15px] px-2 font-semibold text-sm">
              Giá (đ/tháng)
            </th>
            <th className="w-[10%] border text-center py-[15px] px-2 font-semibold text-sm">
              Xem
            </th>
            <th className="w-[10%] border text-center py-[15px] px-2 font-semibold text-sm">
              Chỉnh sửa
            </th>
            <th className="w-[10%] border text-center py-[15px] px-2 font-semibold text-sm">
              Xóa
            </th>
          </tr>
        </thead>
        <tbody>
          {houses?.map((house, index) => {
            return (
              <tr
                className={index % 2 ? "bg-white" : "bg-[#f5f6ff]"}
                key={index}
              >
                <td className="w-[5%] border text-center py-[15px] px-2  text-sm">
                  {index + 1}
                </td>
                <td className="w-[25%] border text-center py-[15px] px-2 text-sm">
                  {house.name}
                </td>
                <td className="w-[20%] border text-center py-[15px] px-2 text-sm">
                  {house.price}
                </td>
                <td className="w-[10%] border text-center py-[15px] px-2 text-sm">
                  <div className="w-full flex justify-center ">
                    <div
                      className="bg-green-500 cursor-pointer w-[50px] h-[36px] flex items-center justify-center rounded-full text-white"
                      data-index={house._id}
                      onClick={handeOpenShowHouseModal}
                    >
                      <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </div>
                  </div>
                </td>
                <td className="w-[10%] border text-center items-center py-[15px] px-2 text-sm">
                  <div className="w-full flex justify-center ">
                    <div
                      className="bg-sky-500 cursor-pointer w-[50px] h-[36px] flex items-center justify-center rounded-full text-white"
                      data-index={house._id}
                      onClick={handleOpenUpdateHouseModal}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </div>
                  </div>
                </td>
                <td className="w-[10%] border text-center items-center py-[15px] px-2 text-sm">
                  <div className="w-full flex justify-center ">
                    <div
                      className="bg-[#fa0000] cursor-pointer w-[50px] h-[36px] flex items-center justify-center rounded-full text-white"
                      data-index={house._id}
                      onClick={handleOpenDeleteHouseModal}
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ModalContent
        show={showCreateHouseModal}
        setShow={setShowCreateHouseModal}
        size="lg"
      >
        <ModalHeader>
          <h2>Tạo mới thông tin nhà</h2>
        </ModalHeader>
        <ModalBody>
          <OnChangeInput
            type="text"
            label="Tên"
            placeholder="Nhập tên"
            name="name"
            onChange={handleChangeInput}
            value={input.name}
          />
          <OnChangeInput
            type="number"
            label="Giá (đ/tháng)"
            placeholder="Nhập giá"
            name="price"
            onChange={handleChangeInput}
            value={input.price}
          />
          <OnChangeInput
            type="text"
            label="Lưu ý"
            placeholder="Nhập lưu ý"
            name="note"
            onChange={handleChangeInput}
            value={input.note}
          />
          <OnChangeInput
            type="text"
            label="Hướng nhà"
            placeholder="Nhập hướng nhà"
            name="homeDirection"
            onChange={handleChangeInput}
            value={input.homeDirection}
          />
          <div className="text-left mb-[20px]">
            <div className="font-medium text-[#16192c] ">Giới tính</div>
            <select
              className="select select-primary w-full mt-[10px]"
              name="gender"
              onChange={handleChangeInput}
            >
              <option>Nam</option>
              <option>Nữ</option>
              <option>Nam và Nữ</option>
            </select>
          </div>
          <div className="text-left mb-[20px]">
            <div className="font-medium text-[#16192c] ">Loại căn</div>
            <select
              className="select select-primary w-full mt-[10px]"
              name="type"
              onChange={handleChangeInput}
            >
              <option>Studio</option>
              <option>1 phòng ngủ</option>
              <option>2 phòng ngủ</option>
              <option>3 phòng ngủ</option>
            </select>
          </div>
          <div className="text-left mb-[20px]">
            <div className="font-medium text-[#16192c] ">Nội thất</div>
            <select
              className="select select-primary w-full mt-[10px]"
              name="furniture"
              onChange={handleChangeInput}
            >
              <option value="0">Không nội thất</option>
              <option value="1">Nội thất một phần</option>
              <option value="2">Nội thất đầy đủ</option>
            </select>
          </div>
          <div className="text-left mb-[20px]">
            <div className="font-medium text-[#16192c]">Mô tả</div>
            <textarea
              className="w-full border border-gray-500 mt-[10px] p-[20px]"
              placeholder="Nhập mô tả"
              name="description"
              cols="30"
              rows="5"
              value={input.description}
              onChange={handleChangeInput}
            ></textarea>
          </div>
          <div className="text-left mb-[20px]">
            <div className="font-medium text-[#16192c] ">
              Hình ảnh (chọn nhiều hình)
            </div>
            <input
              type="file"
              className="file-input file-input-bordered bg-[#FFEAEA] w-full max-w-xs mt-[10px]"
              accept="image/*"
              multiple
              onChange={(e) => setFiles(e.target.files)}
            />
            <div className="mt-[10px]">
              {[...files].map((f, i) => (
                <li key={i}>{f.name}</li>
              ))}
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button
            bgColor="bg-[#565e64]"
            tColor="text-white"
            title="Thoát"
            cName="mr-[10px]"
            onClick={() => setShowCreateHouseModal(false)}
          />
          <Button
            bgColor="bg-sky-500"
            tColor="text-white"
            title="Tạo"
            onClick={handleCreateHouse}
          />
        </ModalFooter>
      </ModalContent>
      <ModalContent
        show={showViewHouseModal}
        setShow={setShowViewHouseModal}
        size="lg"
      >
        <ModalHeader>
          <h2>Xem thông tin nhà</h2>
        </ModalHeader>
        <ModalBody>
          <div className="text-left">
            <div>
              <span className="font-semibold">Tên: </span>
              <span>{input.name}</span>
            </div>
            <div className="mt-[10px]">
              <span className="font-semibold">Loại: </span>
              <span>{input.type}</span>
            </div>
            <div className="mt-[10px]">
              <span className="font-semibold">Giá: </span>
              <span>{input.price} đ/tháng</span>
            </div>
            <div className="mt-[10px]">
              <span className="font-semibold">Lưu ý: </span>
              <span>{input.note}</span>
            </div>
            <div className="mt-[10px]">
              <span className="font-semibold">Hướng nhà: </span>
              <span>{input.homeDirection}</span>
            </div>
            <div className="mt-[10px]">
              <span className="font-semibold">Giới tính: </span>
              <span>{input.gender}</span>
            </div>
            <div className="mt-[10px]">
              <span className="font-semibold">Nội thất: </span>
              <span>
                {input.furniture === 0
                  ? "Không nội thất"
                  : input.furniture === 1
                  ? "Một phần"
                  : "Đầy đủ"}
              </span>
            </div>
            <div className="mt-[10px]">
              <span className="font-semibold">Mô tả: </span>
              <span>{input.description}</span>
            </div>
            <div className="mt-[10px]">
              <div className="font-semibold">Hình ảnh: </div>
              <div class="grid grid-cols-4 gap-2">
                {input.picture?.map((el) => (
                  <div>
                    <img src={el.fileLink} alt="" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            bgColor="bg-[#565e64]"
            tColor="text-white"
            title="Thoát"
            cName="mr-[10px]"
            onClick={() => setShowViewHouseModal(false)}
          />
        </ModalFooter>
      </ModalContent>
      <ModalContent
        show={showUpdateHouseModal}
        setShow={setShowUpdateHouseModal}
      >
        <ModalHeader>
          <h2>Chỉnh sửa thông tin nhà</h2>
        </ModalHeader>
        <ModalBody></ModalBody>
        <ModalFooter>
          <Button
            bgColor="bg-[#565e64]"
            tColor="text-white"
            title="Thoát"
            cName="mr-[10px]"
            onClick={() => setShowUpdateHouseModal(false)}
          />
          <Button
            bgColor="bg-sky-500"
            tColor="text-white"
            title="Cập nhật"
            onClick={handleUpdateHouse}
          />
        </ModalFooter>
      </ModalContent>
      <ModalContent
        show={showDeleteHouseModal}
        setShow={setShowDeleteHouseModal}
      >
        <ModalHeader>
          <h2>Xóa thông tin nhà</h2>
        </ModalHeader>
        <ModalBody>
          <div className="text-left">
            Bạn có muốn xóa thông tin nhà{" "}
            <span className="font-semibold">{input.name}</span>?
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            bgColor="bg-[#565e64]"
            tColor="text-white"
            title="Thoát"
            cName="mr-[10px]"
            onClick={() => setShowDeleteHouseModal(false)}
          />
          <Button
            bgColor="bg-red-500"
            tColor="text-white"
            title="Xóa"
            onClick={handleDeleteHouse}
          />
        </ModalFooter>
      </ModalContent>
    </div>
  );
}
