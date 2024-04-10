import React, { useEffect } from "react";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { BiWorld } from "react-icons/bi";
import moment from "moment";
import ScheduleSuccess from "./ScheduleSuccess/ScheduleSuccess";
import LeftCard from "./LeftCard/LeftCard";
import Form from "./Form/Form";

// hint
const sessions = [
  {
    type: "09:00:00",
    value: "09:00am",
  },
  {
    type: "09:30:00",
    value: "09:30am",
  },
  {
    type: "10:00:00",
    value: "10:00am",
  },
  {
    type: "10:30:00",
    value: "10:30am",
  },
  {
    type: "11:00:00",
    value: "11:00am",
  },
  {
    type: "11:30:00",
    value: "11:30am",
  },
  {
    type: "12:00:00",
    value: "12:00pm",
  },
  {
    type: "12:30:00",
    value: "12:30pm",
  },
  {
    type: "13:00:00",
    value: "01:00pm",
  },
  {
    type: "13:30:00",
    value: "01:30pm",
  },
  {
    type: "14:00:00",
    value: "02:00pm",
  },
  {
    type: "14:30:00",
    value: "02:30pm",
  },
  {
    type: "15:00:00",
    value: "03:00pm",
  },
  {
    type: "15:30:00",
    value: "03:30pm",
  },
  {
    type: "16:00:00",
    value: "04:00pm",
  },
  {
    type: "16:30:00",
    value: "04:30pm",
  },
  {
    type: "17:00:00",
    value: "05:00pm",
  },
  {
    type: "17:30:00",
    value: "05:30pm",
  },
  {
    type: "18:00:00",
    value: "06:00pm",
  },
  {
    type: "18:30:00",
    value: "06:30pm",
  },
  {
    type: "19:00:00",
    value: "07:00pm",
  },
  {
    type: "19:30:00",
    value: "07:30pm",
  },
  {
    type: "20:00:00",
    value: "08:00pm",
  },
  {
    type: "20:30:00",
    value: "08:30pm",
  },
  {
    type: "21:00:00",
    value: "09:00pm",
  },
];

const DemoComponent = () => {
  const [selectedDate, setSelectedDate] = useState(false);
  const [dateChange, setDateChange] = useState("");

  const [availableSessions, setAvailableSessions] = useState();

  const [slotSelected, setSlotSelected] = useState(false);
  const [indexValue, setIndexValue] = useState();
  const [sessionValue, setSessionValue] = useState();
  const [nextbtnSelected, setNextBtnSelected] = useState(false);
  const [scheduleSelected, setScheduleSelected] = useState(false);

  const [sessionSchedule, setSessionScheduled] = useState("");

  const slotClickHandler = (idx, value) => {
    setIndexValue(idx);
    setSlotSelected(true);
    setSessionValue(value);
  };
  const handleNext = (value) => {
    setNextBtnSelected(true);
    let scheduledDate = moment(dateChange).format("dddd MMMM DD, YYYY ");
    let addedTime = moment(value, "HH:mm:ss").add(45, "minutes").format("LT");

    let sessionScheduledTime = value + " - " + addedTime + ", " + scheduledDate;
    setSessionScheduled(sessionScheduledTime);
  };

  const handleUserData = () => {
    const userSessions = JSON.parse(localStorage.getItem("userSession"));
    const timeArr = [];

    if (userSessions && userSessions.length) {
      userSessions.forEach((userSession) => {
        if (
          moment(moment(dateChange).format("YYYY-MM-DD")).isSame(
            userSession.date,
          )
        ) {
          timeArr.push(userSession.sessionTime);
        }
      });
    }
    let allFilteredSessions;

    if (timeArr.length) {
      const dateArr = timeArr.map((el) => {
        return new Date(`${moment(dateChange).format("YYYY-MM-DD")} ${el}`);
      });

      allFilteredSessions = filterSessionFunction(dateArr);
    } else {
      allFilteredSessions = filterSessionFunction(null);
    }
    setAvailableSessions(allFilteredSessions);
  };

  const filterSessionFunction = (filterDateTimeArr = null) => {
    const result = sessions.filter((el, i) => {
      const hour = el.value.slice(0, 2);
      const min = el.value.slice(3, 5);
      let time;
      const timeFormat = el.value.slice(5);
      if (timeFormat === "pm") {
        if (hour === "12") {
          time = `${hour}:${min}:00`;
        } else {
          const x = parseInt(hour) + 12;
          time = `${x}:${min}:00`;
        }
      } else {
        time = el.value.slice(0, 5) + ":00";
      }

      const dateSession = new Date(
        `${moment(dateChange).format("YYYY-MM-DD")} ${time}`,
      );
      if (filterDateTimeArr && filterDateTimeArr.length) {
        let duplicateExists = false;
        for (let filterDateTime of filterDateTimeArr) {
          if (moment(filterDateTime).isSame(dateSession)) {
            duplicateExists = true;
            break;
          }
        }
        if (!duplicateExists) return el;
      } else {
        if (moment().isBefore(dateSession)) {
          return el;
        }
      }
    });
    setAvailableSessions(result);
    return result;
  };

  useEffect(() => {
    if (dateChange) {
      handleUserData();
    }
  }, [dateChange]);

  return (
    <div>
      {!scheduleSelected && (
        <div
          className={`${"w-full max-w-[320px] lg:w-full lg:max-w-[740px]"}  lg:h-[500px] lg:flex flex-row bg-white  mx-auto mt-[32px] rounded-lg `}
        >
          {/* left Card */}

          <LeftCard
            sessionSchedule={sessionSchedule}
            selectedDate={selectedDate}
            nextbtnSelected={nextbtnSelected}
          />

          {/* right Card */}
          {nextbtnSelected ? (
            <Form
              setScheduleSelected={setScheduleSelected}
              dateChange={dateChange}
              sessionValue={sessionValue}
            />
          ) : (
            <div
              className={`lg:flex mt-[52px] lg:mt-[0px] w-full ${
                selectedDate ? "w-full lg:w-2/3" : "w-full lg:w-1/2"
              } h-full  lg:p-[14px] lg:pr-[0px] gap-[6px] pr-0 rounded-lg`}
            >
              <div className="calendarDetails">
                <p className="text-center lg:text-left text-black text-[18px] lg:text-[24px] font-semibold">
                  Select a Date & Time
                </p>

                <div className="lg:flex mt-[32px]">
                  <Calendar
                    className={
                      selectedDate ? "styling-calendar" : "calendar-mobile"
                    }
                    onChange={(value, event) => {
                      setDateChange(value);
                      setSelectedDate(true);
                    }}
                    minDate={moment().toDate()}
                    maxDate={moment().add(15, "days").toDate()}
                    tileDisabled={({ date }) => [0, 6].includes(date.getDay())}
                  />
                </div>

                <div className="mt-[22px]">
                  <p className="font-semibold text-[14px]">Time zone</p>
                  <div className="flex mt-[14px] ms-[12px]">
                    <BiWorld size={20} />
                    <p className="text-[12px] ms-[8px]">
                      Indian Standard Time (4:06pm)
                    </p>
                  </div>
                </div>
              </div>
              {selectedDate && (
                <div className="mt-[12px] p-[12px] lg:p-0  w-full h-auto lg:w-full lg:h-[450px]  bg-white lg:ms-[4px] lg:mt-[18px]  lg:overflow-y-scroll ">
                  <p className="text-black text-center lg:text-left">
                    {moment(dateChange).format("dddd, MMMM D")}
                  </p>
                  {availableSessions &&
                    availableSessions.map((session, idx) => {
                      return idx === indexValue ? (
                        <div className="flex gap-1 py-[22px] w-1/2 lg:w-full mx-auto">
                          <button className="mx-auto w-1/2 lg:mx-0 lg:w-full h-[38px] p-[8px] rounded-md  bg-slate-600 text-white text-[16px] me-[8px]">
                            {session.value}
                          </button>
                          <button
                            className="mx-auto w-1/2 lg:mx-0 lg:w-full h-[38px] p-[8px] rounded-md bg-blue-400 text-white text-[16px]"
                            onClick={() => handleNext(session.value)}
                          >
                            Next
                          </button>
                        </div>
                      ) : (
                        <div
                          key={idx}
                          className="w-1/2 py-[12px] mx-auto lg:mx-0 lg:w-full lg:py-[22px]"
                          onClick={() => slotClickHandler(idx, session.type)}
                        >
                          <button className="w-full h-[38px] hover:border-blue-700 rounded-lg border-2 border-blue-300 text-blue-400">
                            {session.value}
                          </button>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {scheduleSelected && (
        <ScheduleSuccess sessionSchedule={sessionSchedule} />
      )}
    </div>
  );
};

export default DemoComponent;
