import { Link } from "react-router-dom";
import { formatCurrency } from "../core/helpers/string";

export default function HouseCard(props) {
    return (
        <Link to={`/house/${props.id}`}>
            <div className="border border-black border-solid rounded-none card card-compact">
                <figure className="h-[300px] w-full">
                    <img src={props.picture && props.picture[0].fileLink} alt="" className="object-cover w-full h-full" />
                </figure>
                <div className="card-body">
                    <p className="text-3xl font-medium text-black">{props.name}</p>
                    <div className="text-left">
                        <p className="text-lg">
                            Giá thuê: <span className="font-semibold text-orange-700">{formatCurrency(props.price)}/tháng</span>
                        </p>
                        <p className="text-base">
                            Nội thất:{" "}
                            <span className="font-semibold text-gray-800">
                                {props.furniture === 0 ? "Không nội thất" : props.furniture === 1 ? "Nội thất một phần" : "Đầy đủ nội thất"}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
}
