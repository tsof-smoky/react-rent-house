import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";

import HouseItem from "../components/HouseItem";
import { getHouseList } from "../redux/Action/HouseAction";
import { formatCurrency } from "../core/helpers/string";

export default function House() {
    const dispatch = useDispatch();
    const { houses } = useSelector((state) => state.houseList);
    const [houseList, setHouseList] = useState([]);
    const [filter, setFilter] = useState({
        homeType: "",
        building: "",
        priceMax: 50000000,
        priceMin: 0,
        minFurniture: "0",
    });

    const [sort, setSort] = useState("0");

    useEffect(() => {
        if (!houses) {
            dispatch(getHouseList());
        }
    }, []);

    useEffect(() => {
        if (houses) {
            setHouseList(
                houses.filter((el) => {
                    return (
                        el.price <= filter.priceMax &&
                        el.price >= filter.priceMin &&
                        el.name.startsWith(filter.building) &&
                        el.furniture >= filter.minFurniture * 1 &&
                        el.type.startsWith(filter.homeType)
                    );
                })
            );
        }
    }, [houses, filter.homeType, filter.building, filter.priceMin, filter.priceMax, filter.minFurniture]);

    const handleSort = (type) => (a, b) => {
        switch (type) {
          case "1":
            return a.price - b.price;
          case "2":
            return b.price - a.price;
          default:
            return new Date(a.createdAt) - new Date(b.createdAt);
        }
      };
    
    const handleChangeFilter = (name) => (e) => {
        setFilter((prev) => {
            return { ...prev, [name]: e.target.value };
        });
    };

    const handleChangePrice = (e) => {
        const prices = e.target.value.replaceAll("đ", "").split("-");
        setFilter((prev) => {
            return { ...prev, priceMin: prices[0] * 1, priceMax: prices[1] * 1 };
        });
    };

    return (
        <div>
            <img src="/images/house-list-img.png" alt="" />
            <div className="mx-[100px] flex justify-between my-[30px]">
                <select className="select select-primary bg-[#DBECF9]" onChange={handleChangeFilter("homeType")}>
                    <option value="">Loại căn</option>
                    <option>Studio</option>
                    <option>1 phòng ngủ</option>
                    <option>2 phòng ngủ</option>
                    <option>3 phòng ngủ</option>
                </select>
                <select className="select select-primary bg-[#E4DDF9]" onChange={handleChangeFilter("building")}>
                    <option value="">Tòa</option>
                    {[...Array(10)].map((el, index) => (
                        <option key={index}>{`S${index + 1}`}</option>
                    ))}
                </select>
                <select className="select select-primary bg-[#CFEAE1]" onChange={handleChangePrice}>
                    <option value="0đ-50000000đ">Khoảng giá</option>
                    {[...Array(6)].map((el, i) => (
                        <option key={i}>{`${formatCurrency((i + 4) * 1000000)}-${formatCurrency((i + 5) * 1000000)}`}</option>
                    ))}
                    <option>{`${formatCurrency(10000000)}-${formatCurrency(50000000)}`}</option>
                </select>
                <select className="select select-primary bg-[#FFCBCB]" onChange={handleChangeFilter("minFurniture")}>
                    <option value="0">Nội thất tối thiểu</option>
                    <option value="0">Không nội thất</option>
                    <option value="1">Nội thất một phần</option>
                    <option value="2">Đầy đủ nội thất</option>
                </select>

            </div>
            <div className="bg-[#F5F5F5] py-[20px] px-[100px]">
                <div className="text-right">
                    <div className="flex items-center justify-between">
                        <div>
                            Tổng cộng: <span className="font-bold">{houseList.length}</span>
                        </div>
                        <select
                            className="select select-primary bg-[#DBECF9]"
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                        >
                            <option value="0">Sắp xếp theo</option>
                            <option value="1">Giá tăng dần</option>
                            <option value="2">Giá giảm dần</option>
                        </select>
                    </div>

                    <div className="mt-[30px]">
                            {houseList.sort(handleSort(sort)).map((house, index) => (
                            <HouseItem
                                id={house._id}
                                name={house.name}
                                price={house.price}
                                type={house.type}
                                homeDirection={house.homeDirection}
                                picture={house.picture}
                                key={index}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
