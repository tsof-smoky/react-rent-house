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
    dispatch(getHouseList());
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

        <div className="py-[30px]">
          <div>
            <button className="btn btn-outline">Xem các loại phòng</button>
          </div>
          <div className="my-[30px] grid grid-cols-3 mx-[100px] gap-10">
            {houseList?.map((house, index) => (
              <HouseCard
                id={house._id}
                name={house.name}
                area="30m2"
                price={`${house.price}đ/tháng`}
                furniture={house.furniture}
                key={index}
              />
            ))}
          </div>
          <div>
            <Link to="/order">
              <button className="btn btn-outline">Tìm người ở ghép</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
