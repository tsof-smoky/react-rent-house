import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  getUserList,
  updateUser,
  deleteUser,
} from "../../redux/Action/UserAction";
import ModalContent, {
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "../../components/Modal/ModalContent";
import Button from "../../components/Button";
import OnChangeInput from "../../components/OnChangeInput";

export default function UserList() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.userList);
  const { user, error } = useSelector((state) => state.userUpdate);
  const { message: deleteMessage, error: deleteError } = useSelector(
    (state) => state.userDelete
  );
  const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
  const [input, setInput] = useState({});

  useEffect(() => {
    if (!users) {
      dispatch(getUserList());
    }
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (user) {
      users[users.findIndex((el) => user._id === el._id)] = user;
      toast.success("Cập nhập người dùng thành công!");
      setShowUpdateUserModal(false);
    }
  }, [user, error]);

  useEffect(() => {
    if (deleteError) {
      toast.error(deleteError);
    }
    if (deleteMessage) {
      users.splice(
        users.findIndex((el) => input._id === el._id),
        1
      );
      toast.success(deleteMessage);
      setShowDeleteUserModal(false);
    }
  }, [deleteMessage, deleteMessage]);

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  const handleOpenUpdateUserModal = (e) => {
    const index = e.currentTarget.dataset.index;
    setInput({ ...users[index] });
    setShowUpdateUserModal(true);
  };

  const handleUpdateUser = () => {
    dispatch(updateUser(input._id, input.name));
  };

  const handleOpenDeleteUserModal = (e) => {
    const index = e.currentTarget.dataset.index;
    setInput({ ...users[index] });
    setShowDeleteUserModal(true);
  };

  const handleDeleteUser = () => {
    dispatch(deleteUser(input._id));
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
              Email
            </th>
            <th className="w-[25%] border text-center py-[15px] px-2 font-semibold text-sm">
              Tên
            </th>
            <th className="w-[10%] border text-center py-[15px] px-2 font-semibold text-sm">
              Vai trò
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
          {users?.map((user, index) => {
            return (
              <tr
                className={index % 2 ? "bg-white" : "bg-[#f5f6ff]"}
                key={index}
              >
                <td className="w-[5%] border text-center py-[15px] px-2  text-sm">
                  {index + 1}
                </td>
                <td className="w-[20%] border text-center py-[15px] px-2 text-sm">
                  {user.email}
                </td>
                <td className="w-[25%] border text-center py-[15px] px-2 text-sm">
                  {user.name}
                </td>
                <td className="w-[10%] border text-center py-[15px] px-2 text-sm">
                  {user.role}
                </td>
                {user.role === "admin" ? (
                  <>
                    <td className="w-[10%] border text-center items-center py-[15px] px-2 text-sm"></td>
                    <td className="w-[10%] border text-center items-center py-[15px] px-2 text-sm"></td>
                  </>
                ) : (
                  <>
                    <td className="w-[10%] border text-center items-center py-[15px] px-2 text-sm">
                      <div className="w-full flex justify-center ">
                        <div
                          className="bg-sky-500 cursor-pointer w-[50px] h-[36px] flex items-center justify-center rounded-full text-white"
                          data-index={index}
                          onClick={handleOpenUpdateUserModal}
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
                          onClick={handleOpenDeleteUserModal}
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                        </div>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      <ModalContent show={showUpdateUserModal} setShow={setShowUpdateUserModal}>
        <ModalHeader>
          <h2>Chỉnh sửa thông tin người dùng</h2>
        </ModalHeader>
        <ModalBody>
          <OnChangeInput
            type="text"
            label="Họ và tên"
            placeholder="Họ và tên"
            name="name"
            onChange={handleChangeInput}
            value={input.name}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            bgColor="bg-[#565e64]"
            tColor="text-white"
            title="Thoát"
            cName="mr-[10px]"
            onClick={() => setShowUpdateUserModal(false)}
          />
          <Button
            bgColor="bg-sky-500"
            tColor="text-white"
            title="Cập nhật"
            onClick={handleUpdateUser}
          />
        </ModalFooter>
      </ModalContent>
      <ModalContent show={showDeleteUserModal} setShow={setShowDeleteUserModal}>
        <ModalHeader>
          <h2>Bạn có muốn xóa người dùng này?</h2>
        </ModalHeader>
        <ModalBody>
          <div className="text-left">
            <span>Email: </span>
            <span className="font-semibold">{input.email}</span>
            <br />
            <br />
            <span>Họ và tên: </span>
            <span className="font-semibold">{input.name}</span>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            bgColor="bg-[#565e64]"
            tColor="text-white"
            title="Thoát"
            cName="mr-[10px]"
            onClick={() => setShowDeleteUserModal(false)}
          />
          <Button
            bgColor="bg-red-500"
            tColor="text-white"
            title="Xóa"
            onClick={handleDeleteUser}
          />
        </ModalFooter>
      </ModalContent>
    </div>
  );
}
