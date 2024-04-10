import { FaClock } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";
import { CiCalendar } from "react-icons/ci";

const LeftCard = ({ sessionSchedule, selectedDate, nextbtnSelected }) => {
  return (
    <div
      className={`w-full h-auto ${
        selectedDate ? "lg:w-1/3" : "lg:w-1/2"
      } lg:h-full border-r-2 border-slate`}
    >
      {/* Logo */}
      <div className="w-full py-[16px] border-b-2 border-slate">
        <img
          className="w-[86px] h-[86px] lg:w-[72px] lg:h-[72px] mx-auto"
          src="img/logo.png"
          alt="logo"
        />
      </div>
      {/* About Meeting */}
      <div className="relative w-full h-[394px] p-[18px] ">
        {/* Title */}
        <h1 className="font-bold text-black text-[18px] lg:text-[22px]">
          Fibery Demo
        </h1>
        {/* Session Duration */}
        <div className="flex justify-start mt-[12px] w-auto h-auto p-[4px]">
          <FaClock className="Clock" />
          <p className="text-[18px] lg:text-[14px] ms-[8px]">45 min</p>
        </div>
        {/* Schedule Time */}
        {sessionSchedule && (
          <div className="flex justify-start mt-[12px] w-auto h-auto p-[4px]">
            <CiCalendar className="Calendar" />
            <p className="text-[12px] lg:text-[14px] ms-[8px]">
              {sessionSchedule}
            </p>
          </div>
        )}
        {/* Time Zone */}
        <div className="flex justify-start mt-[12px] w-auto h-auto p-[4px]">
          <BiWorld className="World" />
          <p className="text-[16px] lg:text-[14px] ms-[8px]">
            Indian Standard Time
          </p>
        </div>

        {/* About Session */}
        <p className="text-[14px] lg:text-[12px] mt-[12px]">
          Book a meeting with our Fibery team. Talk to a real person about how
          to get your processes set up with us or not.
        </p>

        {/* Cookie Settings */}
        <div className="w-full absolute bottom-3  lg:w-full lg:absolute lg:bottom-5 lg:left-5">
          <p
            className="text-[14px]  lg:text-[14px] text-blue-400 cursor-pointer"
            onClick={() =>
              alert("The selected sessions are stored in local storage")
            }
          >
            Cookie settings
          </p>
        </div>
      </div>
    </div>
  );
};
export default LeftCard;
