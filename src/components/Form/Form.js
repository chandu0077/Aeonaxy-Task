import { IoSunny } from "react-icons/io5";
import { CiLaptop } from "react-icons/ci";
import { VscFeedback } from "react-icons/vsc";
import { FaQuestion } from "react-icons/fa";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaCarrot } from "react-icons/fa";
import { GiEagleEmblem } from "react-icons/gi";
import { LiaHorseHeadSolid } from "react-icons/lia";
import { SiMicrostrategy } from "react-icons/si";
import { FaPeopleRobbery } from "react-icons/fa6";
import moment from "moment";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    guestEmails: yup.string().required(),
    fibertyWorkFor: yup.string().required(),
    strategyTopic: yup.string().optional(),
    productManagementTopic: yup.string().optional(),
    engineeringTopic: yup.string().optional(),
    feedbackTopic: yup.string().optional(),
    somethingElseTopic: yup.string().optional(),

    // interestedTopics: yup
    //   .string()
    //   .oneOf([
    //     "Strategy",
    //     "Product Management",
    //     "Engineering",
    //     "Feedback Management",
    //     "Something else",
    //   ]),

    about: yup.string().required(),
    workspace: yup.string().required(),
  })
  .required();

const Form = ({
  // handleScheduleEvent,
  setScheduleSelected,
  dateChange,
  sessionValue,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    let modifiedDate = moment(dateChange).format("YYYY-MM-DD");

    const interestingTopics = [];

    for (let el in data) {
      if (
        data[el] !== "false" &&
        [
          "engineeringTopic",
          "feedbackTopic",
          "productManagementTopic",
          "somethingElseTopic",
          "strategyTopic",
        ].includes(el)
      ) {
        interestingTopics.push(data[el]);
      }
    }

    const dataToStore = {
      ...data,
      interestingTopics: interestingTopics,
    };

    const sessionDetails = {
      date: modifiedDate,
      sessionTime: sessionValue,
      formData: dataToStore,
    };
    const res = JSON.parse(localStorage.getItem("userSession"));
    let newData;
    if (res) {
      newData = [...res, sessionDetails];
    } else {
      newData = [sessionDetails];
    }
    localStorage.setItem("userSession", JSON.stringify(newData));
    setScheduleSelected(true);
  };

  return (
    <div className="w-full lg:w-2/3 p-[22px] lg:overflow-y-scroll">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* UserName */}
        <div>
          <label htmlFor="username">Name</label>
          <input
            type="text"
            className="w-full border-2 border-slate rounded mt-2"
            {...register("name")}
          />
        </div>
        {/* Email */}
        <div className="mt-[10px]">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="w-full border-2 border-slate rounded mt-2"
            {...register("email")}
          />
        </div>
        {/* Guest email */}
        <div className="mt-[10px]">
          <label htmlFor="additional comments">Guest Email(s)</label>
          <textarea
            rows={4}
            cols={5}
            className="w-full h-[] border-2 border-slate rounded-md mt-2"
            {...register("guestEmails")}
          />
        </div>
        {/* Fiberty Work */}
        <div className="mt-[16px]">
          <p className="text-black text-[12px] lg:text-[16px] font-semibold">
            I want Fiberty to work for:*
          </p>
          <div className="flex mt-[10px]">
            <input
              {...register("fibertyWorkFor")}
              type="radio"
              name="fibertyWorkFor"
              value="myself"
              width="18px"
              id="myself"
            />
            <div className="flex ms-[10px] gap-x-2">
              <FaCarrot size={22} color="orange" />
              <label for="myself"> Myself</label>
            </div>
            <br></br>
          </div>
          <div className="flex mt-[10px]">
            <input
              {...register("fibertyWorkFor")}
              type="radio"
              name="fibertyWorkFor"
              value="lessThan10"
              width="18px"
              id="lessThan10"
            />
            <div className="flex ms-[10px] gap-x-2">
              <FaPeopleRobbery size={22} color="brown" />
              <label for="lessThan10"> 10people</label>
            </div>
            <br></br>
          </div>
          <div className="flex mt-[10px]">
            <input
              {...register("fibertyWorkFor")}
              type="radio"
              name="fibertyWorkFor"
              value="10-50"
              width="18px"
              id="10-50"
            />
            <div className="flex ms-[10px] gap-x-2">
              <LiaHorseHeadSolid size={22} color="blue" />
              <label for="10-50"> 10-50people</label>
            </div>
            <br></br>
          </div>
          <div className="flex mt-[10px]">
            <input
              {...register("fibertyWorkFor")}
              type="radio"
              name="fibertyWorkFor"
              value="50+"
              width="18px"
              id="50+"
            />
            <div className="flex ms-[10px] gap-x-2">
              <GiEagleEmblem size={22} color="brown" />
              <label for="50+"> 50+ people</label>
            </div>
            <br></br>
          </div>
        </div>
        {/* Interested */}
        <div className="mt-[16px]">
          <p className="text-black text-[12px] lg:text-[16px] font-semibold">
            Please, choose up to three options. You are more interested in:
          </p>
          <div className="flex mt-[10px]">
            <input
              {...register("strategyTopic")}
              type="checkbox"
              id="strategy"
              value="Strategy"
              name="strategyTopic"
              width="18px"
            />
            <div className="flex ms-[10px] gap-x-2">
              <SiMicrostrategy size={22} color="blue" />
              <label for="strategy"> Strategy</label>
            </div>
            <br></br>
          </div>
          <div className="flex mt-[10px]">
            <input
              {...register("productManagementTopic")}
              type="checkbox"
              id="productManagement"
              name="productManagementTopic"
              value="Product Management"
              width="18px"
            />
            <div className="flex ms-[10px] gap-x-2">
              <IoSunny size={22} color="yellow" />
              <label for="productManagement"> Product Management</label>
            </div>
            <br></br>
          </div>
          <div className="flex mt-[10px]">
            <input
              {...register("engineeringTopic")}
              type="checkbox"
              id="engineering"
              name="engineeringTopic"
              value="Engineering"
              width="18px"
            />
            <div className="flex ms-[10px] gap-x-2">
              <CiLaptop size={22} color="brown" />
              <label for="engineering"> Engineering</label>
            </div>
            <br></br>
          </div>
          <div className="flex mt-[10px]">
            <input
              {...register("feedbackTopic")}
              type="checkbox"
              id="feedbackManagement"
              name="feedbackTopic"
              value="Feedback Management"
              width="18px"
            />
            <div className="flex ms-[10px] gap-x-2">
              <VscFeedback size={22} color="blue" />
              <label for="feedbackMangament"> Feedback Mangament</label>
            </div>
            <br></br>
          </div>
          <div className="flex mt-[10px]">
            <input
              {...register("somethingElseTopic")}
              type="checkbox"
              id="somethingElse"
              name="somethingElseTopic"
              value="Something else"
              width="18px"
            />
            <div className="flex ms-[10px] gap-x-2">
              <FaQuestion size={22} color="red" />
              <label for="somethingElse"> Something else</label>
            </div>
            <br></br>
          </div>
        </div>
        {/* Help for meeting */}
        <div className="mt-[18px]">
          <label
            htmlFor="additional comments"
            className="text-black text-[12px] lg:text-[16px] font-semibold"
          >
            Please, share anything that will help prepare for our meeting.
          </label>
          <textarea
            rows={4}
            cols={5}
            className="w-full h-[] border-2 border-slate rounded-md mt-2"
            {...register("about")}
          />
        </div>
        {/* Fibery Workspace */}
        <div className="mt-[18px]">
          <label
            htmlFor="additional comments"
            className="text-black text-[12px] lg:text-[16px] font-semibold"
          >
            Please, share with us the name of your Fibery workspace (if any).
          </label>
          <input
            className="w-full h-[52px] border-2 border-slate rounded-md mt-2"
            {...register("workspace")}
          />
        </div>

        {/* Terms and conditions */}
        <p className="text-black text-[12px] lg:text-[14px] mt-[26px]">
          By proceeding, you confirm that you have read and agree to Calendly's
          Terms of Use and
          <span className="text-blue">Privacy Notice.</span>
        </p>
        {/* Schedule button */}
        <button
          className="text-white bg-blue-500 p-3 rounded-full mt-[22px] "
          // onClick={handleScheduleEvenet}
        >
          Schedule Event
        </button>
      </form>
    </div>
  );
};
export default Form;
