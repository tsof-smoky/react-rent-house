import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getOrderList, deleteOrder } from "../../redux/Action/OrderAction";
import ModalContent, {
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "../../components/Modal/ModalContent";
import Button from "../../components/Button";

export default function OrderList() {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orderList);
  const { message, error } = useSelector((state) => state.orderDelete);

  const [showViewOrderModal, setShowViewOrderModal] = useState(false);
  const [showDeleteOrderModal, setShowDeleteOrderModal] = useState(false);

  const [order, setOrder] = useState({});

  useEffect(() => {
    if (!orders) {
      dispatch(getOrderList());
    }
    console.log(orders);
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (message) {
      orders.splice(
        orders.findIndex((el) => order._id === el._id),
        1
      );
      toast.success(message);
      setShowDeleteOrderModal(false);
    }
  }, [message, error]);

  const handeOpenShowOrderModal = (e) => {
    const index = orders.findIndex(
      (el) => e.currentTarget.dataset.index === el._id
    );
    setOrder({ ...orders[index] });
    setShowViewOrderModal(true);
  };

  const handleOpenDeleteOrderModal = (e) => {
    const index = orders.findIndex(
      (el) => e.currentTarget.dataset.index === el._id
    );
    setOrder({ ...orders[index] });
    setShowDeleteOrderModal(true);
  };

  const handleDeleteOrder = () => {
    dispatch(deleteOrder(order._id));
  };

  return (
    <div className="mt-[50px]">
      <ToastContainer autoClose={3000} />
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
                      data-index={order._id}
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
                      data-index={order._id}
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
      <ModalContent
        show={showViewOrderModal}
        setShow={setShowViewOrderModal}
        size="lg"
      >
        <ModalHeader>
          <h2>Xem thông tin nhà</h2>
        </ModalHeader>
        <ModalBody>
          <div className="text-left">
            <div>
              <span className="font-semibold">Họ và tên: </span>
              <span>{order.fullName}</span>
            </div>
            <div className="mt-[10px]">
              <span className="font-semibold">Loại nhà: </span>
              <span>{order.homeType}</span>
            </div>
            <div className="mt-[10px]">
              <span className="font-semibold">Giới tính: </span>
              <span>{order.gender}</span>
            </div>
            <div className="mt-[10px]">
              <span className="font-semibold">Nội thất tối thiểu: </span>
              <span>
                {order.minFurniture === 0
                  ? "Không nội thất"
                  : order.minFurniture === 1
                  ? "Một phần"
                  : "Đầy đủ"}
              </span>
            </div>
            <div className="mt-[10px]">
              <span className="font-semibold">Khoảng giá: </span>
              <span>
                {order.priceMin} đ/tháng - {order.priceMax} đ/tháng
              </span>
            </div>
            <div className="mt-[10px]">
              <span className="font-semibold">Số người hiện tại: </span>
              <span>{order.currentPeopleNum}</span>
            </div>
            <div className="mt-[10px]">
              <span className="font-semibold">Số người mong muốn: </span>
              <span>{order.wantedPeopleNum}</span>
            </div>
            <div className="mt-[10px]">
              <span className="font-semibold">Ngày sinh: </span>
              <span>{order.dateOfBirth}</span>
            </div>
            <div className="mt-[10px]">
              <span className="font-semibold">Hình ảnh hiện tại: </span>
              <img src={order.avatarLink} className="w-[300px]" alt="" />
            </div>
            <div className="mt-[10px]">
              <span className="font-semibold">
                Căn cước công dân mặt trước:{" "}
              </span>
              <img src={order.identityFrontLink} className="w-[300px]" alt="" />
            </div>
            <div className="mt-[10px]">
              <span className="font-semibold">Căn cước công dân mặt sau: </span>
              <img src={order.identityBackLink} className="w-[300px]" alt="" />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            bgColor="bg-[#565e64]"
            tColor="text-white"
            title="Thoát"
            cName="mr-[10px]"
            onClick={() => setShowViewOrderModal(false)}
          />
        </ModalFooter>
      </ModalContent>
      <ModalContent
        show={showDeleteOrderModal}
        setShow={setShowDeleteOrderModal}
      >
        <ModalHeader>
          <h2>Xóa yêu cầu tìm kiếm bạn cùng phòng</h2>
        </ModalHeader>
        <ModalBody>
          <div className="text-left">
            Bạn có muốn xóa yêu cầu tìm kiếm bạn cùng phòng của{" "}
            <span className="font-semibold">{order.fullName}</span>?
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            bgColor="bg-[#565e64]"
            tColor="text-white"
            title="Thoát"
            cName="mr-[10px]"
            onClick={() => setShowDeleteOrderModal(false)}
          />
          <Button
            bgColor="bg-red-500"
            tColor="text-white"
            title="Xóa"
            onClick={handleDeleteOrder}
          />
        </ModalFooter>
      </ModalContent>
    </div>
  );
}
