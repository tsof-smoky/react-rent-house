import { Link } from "react-router-dom";

export default function HouseCard(props) {
  return (
    <Link to={`/house/${props.id}`}>
      <div className="card card-compact border-solid border border-black rounded-none pt-[20px]">
        <figure>
          <img
            src={props.picture && props.picture[0].fileLink}
            alt=""
            className="h-[300px]"
          />
        </figure>
        <div className="card-body">
          <p className="text-[30px]">{props.name}</p>
          <div className="text-left mt-[20px]">
            <p>Giá thuê: {props.price}đ/tháng</p>
            <p>
              Nội thất:{" "}
              {props.furniture === 0
                ? "Không nội thất"
                : props.furniture === 1
                ? "Nội thất một phần"
                : "Đầy đủ nội thất"}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
