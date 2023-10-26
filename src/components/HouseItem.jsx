import { faBed } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { formatCurrency } from "../core/helpers/string";

export default function HouseItem(props) {
    return (
        <Link to={`/house/${props.id}`}>
            <div className="grid grid-cols-12 gap-20 p-[30px] border border-black bg-white my-[30px]">
                <div className="col-span-5">
                    <img src={props.picture && props.picture[0].fileLink} alt="" className="h-[300px] mx-auto" />
                </div>
                <div className="flex flex-col justify-between col-span-7 text-left">
                    <div>
                        <p className="text-[30px]">{props.name}</p>
                        <div className="bg-white flex mt-[30px]">
                            <div className="flex items-center mr-[40px]">
                                <FontAwesomeIcon className="text-[25px] mr-[10px]" icon={faBed} />
                                {props.type}
                            </div>
                        </div>
                    </div>
                    <div className="font-bold text-[30px]">{formatCurrency(props.price)}/tháng</div>
                </div>
            </div>{" "}
        </Link>
    );
}
