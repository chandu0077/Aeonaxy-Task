import React from "react";
import "react-calendar/dist/Calendar.css";
import { BiWorld } from "react-icons/bi";
import { CiCalendar } from "react-icons/ci";

import { TiTickOutline } from "react-icons/ti";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineVideocam } from "react-icons/md";

const ScheduleSuccess = ({ sessionSchedule }) => {
  const dummySignUp = (type) => {
    alert(`${type} signup isn't integrated as this is an assignment`);
  };

  return (
    <div
      className={`${"w-full max-w-[300px] lg:w-full lg:max-w-[740px]"} h-auto flex flex-col items-center bg-white mx-auto mt-[32px] rounded-md`}
    >
      <div>
        <img
          className="rounded-full w-[75px] h-[75px] lg:w-[50px] lg:h-[50px] mt-[18px]"
          src="img/profile.jpg"
          alt="profile"
        />
      </div>
      <div className="flex mt-[22px]">
        <TiTickOutline color="green" size={32} />
        <p className="text-bold text-[24px] ">You are scheduled</p>
      </div>
      <p className="text-normal text-[14px] mt-[12px] px-[4px]">
        A calendar inviation has been sent to your email address.
      </p>
      <div className="p-[12px] mx-[4px] border-slate border-2 rounded-md h-auto w-auto mt-[8px]">
        <p className="text-bold text-black text-[20px]">Fibery Demo</p>
        <div className="flex mt-[8px]">
          <IoPersonOutline color="grey" size={20} />
          <p className="text-[16px] ms-[8px] text-gray-500">Polina Zenevich</p>
        </div>
        <div className="flex mt-[8px]">
          <CiCalendar color="grey" size={20} />
          <p className="text-[16px] ms-[8px] text-gray-500">
            {sessionSchedule}
          </p>
        </div>
        <div className="flex mt-[8px]">
          <BiWorld color="grey" size={20} />
          <p className="text-[16px] ms-[8px] text-gray-500">
            UK, Ireland, Lisbon Time
          </p>
        </div>
        <div className="flex mt-[8px]">
          <MdOutlineVideocam color="grey" size={20} />
          <p className="text-[16px] ms-[8px] text-gray-500">
            Web conferencing details to follow
          </p>
        </div>
      </div>
      <div className="border-2 border-slate w-auto mt-[22px]"></div>
      <div className="mt-[8px] text-start">
        <p className="text-bold text-[18px] text-black px-[4px]">
          Schedule your own meetings with Calendly for free
        </p>
        <p className="text-normal text-[12px] px-[4px]">
          Eliminate the back-and-forth emails for finding time.
        </p>
        <div className="flex justify-between flex-col items-center gap-2 lg:items-start lg:flex-row mt-[12px]">
          <button
            onClick={() => dummySignUp("Google")}
            className="w-[220px] p-2 h-[52px]  rounded-full border-black border-2"
          >
            <div className="flex">
              <img
                src="img/google_icon.png"
                alt="google logo"
                className="w-[28px] h-[28px]"
              />{" "}
              <p className="text-[16px]">Sign up with Google</p>
            </div>
          </button>
          <button
            onClick={() => dummySignUp("Microsoft")}
            className="w-[220px] h-[52px] p-2 rounded-full border-black border-2"
          >
            <div className="flex">
              <img
                src="img/microsoft_icon.png"
                alt="microsoft logo"
                className="w-[28px] h-[28px]"
              />{" "}
              <p className="text-[14px]">Sign up with Microsoft</p>
            </div>
          </button>
        </div>
        <p
          onClick={() => dummySignUp("Work")}
          className="cursor-pointer text-blue-400 text-[12px] mt-[12px] mb-[12px] text-center"
        >
          Sign up with work email
        </p>
      </div>
    </div>
  );
};

export default ScheduleSuccess;
