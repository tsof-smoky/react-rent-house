import { Link } from "react-router-dom";

export default function HouseCard(props) {
  return (
    <Link to={`/house/${props.id}`}>
      <div className="card card-compact border-solid border border-black rounded-none">
        <figure>
          <img src="/images/house-img.png" alt="House" />
        </figure>
        <div className="card-body">
          <p className="text-[30px]">{props.name}</p>
          <div className="text-left mt-[20px]">
            <p>Diện tích: {props.area}</p>
            <p>Giá thuê: {props.price}</p>
            <p>Nội thất: {props.furniture}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
