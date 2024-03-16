import React, { useState } from "react";
const listData = ["My Info.", "Blogs", "General Info", "Teams", "Photos"];

const SideBar = () => {
  const [isActive, setIsActive] = useState(4);

  return (
    <div className="">
      <div className=" w-[98%] h-[1px] bg-gray-200 mt-[72px]"></div>
      <ul className="flex flex-col gap-4 text-white text-lg font-semibold mt-10">
        {listData.map((list, index) => (
          <li
            onClick={() => setIsActive(index)}
            key={list}
            className={`cursor-pointer pl-8 py-2 hover:bg-white hover:rounded-l-3xl hover:text-[#196c6c] transition-all duration-200 ease-in-out ${
              isActive === index
                ? "cursor-pointer bg-white pl-8 py-2 rounded-l-3xl text-[#196c6c] "
                : ""
            }`}
          >
            {list}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
