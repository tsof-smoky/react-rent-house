import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";

import HouseItem from "../components/HouseItem";
import { getHouseDetail, getHouseList } from "../redux/Action/HouseAction";

export default function House() {
  const dispatch = useDispatch();
  const { houses } = useSelector((state) => state.houseList);
  const [houseList, setHouseList] = useState([]);

  useEffect(() => {
    dispatch(getHouseList());
  }, []);

  useEffect(() => {
    if (houses) {
      console.log(houses);
      setHouseList(houses);
    }
  }, [houses]);
  return (
    <div>
      <img src="/images/house-list-img.png" alt="" />
      <div className="mx-[100px] flex justify-between my-[30px]">
        <select className="select select-primary bg-[#DBECF9]" value="Loại căn">
          <option disabled>Loại căn</option>
        </select>
        <select className="select select-primary bg-[#E4DDF9]" value="Tòa">
          <option disabled>Tòa</option>
        </select>
        <select
          className="select select-primary bg-[#CFEAE1]"
          value="Khoảng giá"
        >
          <option disabled>Khoảng giá</option>
        </select>
        <select
          className="select select-primary bg-[#FFF2D0]"
          value="Hướng nhà"
        >
          <option disabled>Hướng nhà</option>
        </select>
        <select
          className="select select-primary bg-[#FFCBCB]"
          value="Nội thất tối thiểu"
        >
          <option disabled>Nội thất tối thiểu</option>
        </select>
        <button className="btn bg-[#1C156C] text-white hover:text-black">
          Tìm kiếm
        </button>
      </div>
      <div className="bg-[#F5F5F5] py-[20px] px-[100px]">
        <div className="text-right">
          <button className="btn bg-[#E3EFF8]">
            Sắp xếp theo <FontAwesomeIcon icon={faSort} />
          </button>
          <div className="mt-[30px]">
            {houseList.map((house, index) => (
              <HouseItem
                id={house._id}
                name={house.name}
                area="30m2"
                price={`${house.price}đ/tháng`}
                bedrooms={house.type}
                direction={house.balconyDirection}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
