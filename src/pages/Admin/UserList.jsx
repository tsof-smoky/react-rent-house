import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import {
  getUserList,
  updateUser,
  deleteUser,
} from "../../redux/Action/UserAction";
export default function UserList() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.userList);

  useEffect(() => {
    if (!users) {
      dispatch(getUserList());
    }
    console.log(users);
  }, []);

  const handleOpenEditUserModal = () => {};

  const handleOpenDeleteUserModal = () => {};

  return (
    <div className="mt-[50px]">
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
                          onClick={handleOpenEditUserModal}
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
    </div>
  );
}
