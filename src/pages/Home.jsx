import React from "react";
import HouseCard from "../components/HouseCard";
export default function Home() {
  return (
    <>
      <div>
        <img src="/images/home-img.png" alt="" />

        <div className="py-[30px]">
          <div>
            <button className="btn btn-outline">Xem các loại phòng</button>
          </div>
          <div className="my-[30px] grid grid-cols-3 mx-[100px] gap-10">
            {[...Array(6)].map((el, index) => (
              <HouseCard
                id={index}
                name="Căn Studio"
                area="30m2"
                price="5.000.000đ/ tháng"
                furniture="đầy đủ"
              />
            ))}
          </div>
          <div>
            <button className="btn btn-outline">Tìm người ở ghép</button>
          </div>
        </div>
      </div>
    </>
  );
}
