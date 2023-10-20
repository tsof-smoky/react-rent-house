import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrashCan,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

import {
  getOrderList,
  updateOrder,
  deleteOrder,
} from "../../redux/Action/OrderAction";

import ModalContent, {
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "../../components/Modal/ModalContent";
import Button from "../../components/Button";

export default function OrderList() {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orderList);

  useEffect(() => {
    if (!orders) {
      dispatch(getOrderList());
    }
    console.log(orders);
  }, []);

  const handeOpenShowOrderModal = () => {};

  const handleOpenDeleteOrderModal = () => {};

  return (
    <div className="mt-[50px]">
      <table className="min-w-full bg-white mt-[20px] ">
        <thead className="border-collapse border">
          <tr>
            <th className="w-[5%] border text-center py-[15px] px-2  font-semibold text-sm">
              #
            </th>
            <th className="w-[20%] border text-center py-[15px] px-2 font-semibold text-sm">
              Tên
            </th>
            <th className="w-[25%] border text-center py-[15px] px-2 font-semibold text-sm">
              Loại căn
            </th>
            <th className="w-[10%] border text-center py-[15px] px-2 font-semibold text-sm">
              Xem chi tiết
            </th>
            <th className="w-[10%] border text-center py-[15px] px-2 font-semibold text-sm">
              Xóa
            </th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order, index) => {
            return (
              <tr
                className={index % 2 ? "bg-white" : "bg-[#f5f6ff]"}
                key={index}
              >
                <td className="w-[5%] border text-center py-[15px] px-2  text-sm">
                  {index + 1}
                </td>
                <td className="w-[20%] border text-center py-[15px] px-2 text-sm">
                  {order.fullName}
                </td>
                <td className="w-[25%] border text-center py-[15px] px-2 text-sm">
                  {order.homeType}
                </td>
                <td className="w-[10%] border text-center py-[15px] px-2 text-sm">
                  <div className="w-full flex justify-center ">
                    <div
                      className="bg-green-500 cursor-pointer w-[50px] h-[36px] flex items-center justify-center rounded-full text-white"
                      data-index={index}
                      onClick={handeOpenShowOrderModal}
                    >
                      <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </div>
                  </div>
                </td>
                <td className="w-[10%] border text-center items-center py-[15px] px-2 text-sm">
                  <div className="w-full flex justify-center ">
                    <div
                      className="bg-[#fa0000] cursor-pointer w-[50px] h-[36px] flex items-center justify-center rounded-full text-white"
                      data-index={index}
                      onClick={handleOpenDeleteOrderModal}
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
