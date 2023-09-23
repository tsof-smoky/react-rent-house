import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import HouseItem from "../components/HouseItem";
export default function House() {
  return (
    <div>
      <img src="/images/house-list-img.png" alt="" />
      <div className="mx-[100px] flex justify-between my-[30px]">
        <select className="select select-primary" value="Loại căn">
          <option disabled>Loại căn</option>
        </select>
        <select className="select select-primary" value="Tòa">
          <option disabled>Tòa</option>
        </select>
        <select className="select select-primary" value="Khoảng giá">
          <option disabled>Khoảng giá</option>
        </select>
        <select className="select select-primary" value="Hướng nhà">
          <option disabled>Hướng nhà</option>
        </select>
        <select className="select select-primary" value="Nội thất tối thiểu">
          <option disabled>Nội thất tối thiểu</option>
        </select>
        <button className="btn btn-warning">Tìm kiếm</button>
      </div>
      <div className="bg-[#F5F5F5] py-[20px] px-[100px]">
        <div className="text-right">
          <button className="btn btn-outline">
            Sắp xếp theo <FontAwesomeIcon icon={faSort} />
          </button>
          <div className="mt-[30px]">
            {" "}
            {[...Array(10)].map((el, index) => (
              <HouseItem id={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
