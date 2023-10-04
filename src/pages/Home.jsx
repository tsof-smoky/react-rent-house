import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import HouseCard from "../components/HouseCard";
import { getHouseList } from "../redux/Action/HouseAction";
export default function Home() {
  const dispatch = useDispatch();
  const { houses } = useSelector((state) => state.houseList);
  const [houseList, setHouseList] = useState([]);

  useEffect(() => {
    if (!houses) {
      dispatch(getHouseList());
    }
  }, []);

  useEffect(() => {
    if (houses) {
      setHouseList(houses.slice(0, 3));
    }
  }, [houses]);

  return (
    <>
      <div>
        <img src="/images/home-img.png" alt="" />
        <div className="text-[40px] text-[#B19D7A] text-left mx-[100px] my-[30px]">
          Ứng dụng tìm nhà tiện lợi, dễ dàng, nhanh chóng <br />
          Luôn đặt sự uy tín và tử tế lên hàng đầu
        </div>

        <div className="py-[30px]">
          <div>
            <button className="btn btn-outline bg-[#CFEAE1] px-[50px]">
              Xem các loại phòng
            </button>
          </div>
          <div className="my-[30px] grid grid-cols-3 mx-[100px] gap-10">
            {houseList?.map((house, index) => (
              <HouseCard
                id={house._id}
                name={house.name}
                area="null"
                price={house.price}
                furniture={house.furniture}
                key={index}
                pictureLink={house.pictureLink}
              />
            ))}
          </div>
          <div>
            <Link to="/order">
              <button className="btn btn-outline bg-[#CFEAE1] px-[50px]">
                Tìm người ở ghép
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
