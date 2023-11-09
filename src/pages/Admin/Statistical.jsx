import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { getStatistical } from "../../redux/Action/StatisticalAction";
import Button from "../../components/Button";

export default function Statistical() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.statistical);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState(new Date());
  const [userData, setUserData] = useState([]);
  const [houseData, setHouseData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    var date = new Date(endDate);
    date.setDate(date.getDate() - 7);
    setStartDate(date);
  }, []);

  useEffect(() => {
    if (data) {
      setUserData(
        data.dates?.map((date, index) => {
          return { name: date, user: data.user[index] };
        })
      );
      setHouseData(
        data.dates?.map((date, index) => {
          return { name: date, house: data.house[index] };
        })
      );
      setOrderData(
        data.dates?.map((date, index) => {
          return { name: date, order: data.order[index] };
        })
      );
      setRevenueData(
        data.dates?.map((date, index) => {
          return { name: date, order: data.order[index]*50000 };
        })
      );
    } else if (error) {
      toast.error(error);
    }
  }, [data, loading, error]);

  const add1Date = (thisDate) => {
    var date = new Date(thisDate);
    date.setDate(date.getDate() + 1);
    return date;
  };

  const checkDate = () => {
    if (startDate > endDate) {
      toast.error("Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc");
      return false;
    }
    const date = new Date(startDate);
    date.setDate(date.getDate() + 30);
    if (endDate > date) {
      toast.error("Số ngày thống kê tối đa là 30 ngày");
      return false;
    }
    return true;
  };

  const handleGetStatistical = () => {
    if (checkDate()) {
      var currentDate = startDate;
      currentDate.setUTCHours(0, 0, 0, 0);
      const dateArr = [];
      while (currentDate <= endDate) {
        const objectDate = new Date(currentDate);
        let day = objectDate.getDate();
        let month = objectDate.getMonth() + 1;
        let year = objectDate.getFullYear();

        dateArr.push(`${year}-${month}-${day}`);
        currentDate = add1Date(currentDate);
      }
      dispatch(getStatistical(dateArr));
    }
  };

  return (
    <div>
      <ToastContainer autoClose={3000} />
      <div className="flex items-center mt-[20px]">
        <span className="mr-[15px]">Bắt đầu từ: </span>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          className="w-full text-left rounded-[10px] py-[10px] pl-[20px]  bg-[#FFEAEA]"
        />
        <span className="mx-[15px]">đến:</span>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          className="w-full text-left rounded-[10px] py-[10px] pl-[20px] bg-[#FFEAEA]"
        />
        <Button
          bgColor="bg-green-500"
          tColor="text-white"
          title="Thống kê"
          onClick={handleGetStatistical}
          cName="ml-[20px]"
        />
      </div>
      <div className="mt-[50px]">
        <div className="mb-[30px] text-[30px] font-semibold">
          Thống kê người dùng
        </div>
        <LineChart width={1200} height={300} data={userData} className="m-auto">
          <Line type="monotone" dataKey="user" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </div>
      <div className="mt-[50px]">
        <div className="mb-[30px] text-[30px] font-semibold">
          Thống kê yêu cầu tìm bạn cùng phòng
        </div>
        <LineChart
          width={1200}
          height={300}
          data={orderData}
          className="m-auto"
        >
          <Line type="monotone" dataKey="order" stroke="#82ca9d" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </div>
      <div className="mt-[50px]">
        <div className="mb-[30px] text-[30px] font-semibold">
          Thống kê thông tin nhà ở
        </div>
        <LineChart
          width={1200}
          height={300}
          data={houseData}
          className="m-auto"
        >
          <Line type="monotone" dataKey="house" stroke="red" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </div>
      <div className="mt-[50px]">
        <div className="mb-[30px] text-[30px] font-semibold">
          Thống kê thông tin doanh thu
        </div>
        <LineChart
          width={1200}
          height={300}
          data={revenueData}
          className="m-auto"
        >
          <Line type="monotone" dataKey="order" stroke="red" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </div>
    </div>
  );
}
