import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVectorSquare,
  faBed,
  faBath,
  faCompass,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function HouseItem(props) {
  return (
    <Link to={`/house/${props.id}`}>
      <div className="grid grid-cols-12 gap-20 p-[30px] border border-black bg-white my-[30px]">
        <div className="col-span-5">
          <img
            src={props.picture && props.picture[0].fileLink}
            alt=""
            className="h-[300px] mx-auto"
          />
        </div>
        <div className="col-span-7 text-left flex flex-col justify-between">
          <div>
            <p className="text-[30px]">{props.name}</p>
            <div className="bg-white flex mt-[30px]">
              <div className="flex items-center mr-[40px]">
                <FontAwesomeIcon
                  className="text-[25px] mr-[10px]"
                  icon={faBed}
                />
                {props.type}
              </div>
            </div>
          </div>
          <div className="font-bold text-[30px]">{props.price}đ/tháng</div>
        </div>
      </div>{" "}
    </Link>
  );
}
