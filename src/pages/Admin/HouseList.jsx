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
} from "../../redux/Action/HouseAction";
export default function HouseList() {
  const dispatch = useDispatch();
  const { houses } = useSelector((state) => state.houseList);

  useEffect(() => {
    if (!houses) {
      dispatch(getHouseList());
    }
    console.log(houses);
  }, []);

  const handeOpenShowHouseModal = () => {};

  const handleOpenEditHouseModal = () => {};

  const handleOpenDeleteHouseModal = () => {};

  return (
    <div className="mt-[50px]">
      <table className="min-w-full bg-white mt-[20px] ">
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
                      data-index={index}
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
                      data-index={index}
                      onClick={handleOpenEditHouseModal}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </div>
                  </div>
                </td>
                <td className="w-[10%] border text-center items-center py-[15px] px-2 text-sm">
                  <div className="w-full flex justify-center ">
                    <div
                      className="bg-[#fa0000] cursor-pointer w-[50px] h-[36px] flex items-center justify-center rounded-full text-white"
                      data-index={index}
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
    </div>
  );
}
