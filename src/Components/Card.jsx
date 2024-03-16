import React from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useSelector } from "react-redux";
import isPrime from "../helper/isPrime";

const Card = ({ userData }) => {
  const isIdSeq = useSelector((state) => state.idSequence.idSequence);
  const { id, title, albumId, thumbnailUrl, url, email } = userData;

  function checkId(currId) {
    if (isPrime(currId)) {
      return "Prime";
    } else if (currId % 2 !== 0) {
      return "Odd";
    } else {
      return "Even";
    }
  }

  return (
    <div className=" w-64 flex items-center flex-col p-4 border rounded-xl gap-2 relative">
      <div className=" absolute right-2">
        <HiOutlineDotsVertical />
      </div>
      <img
        src={thumbnailUrl ? thumbnailUrl : url}
        alt=""
        className=" rounded-full w-24"
      />
      <p className=" capitalize">{title.slice(0, 15)}</p>
      <button className="  bg-[#ceffff] px-4 py-1 rounded-lg">
        Album {albumId}
      </button>
      {checkId(id) === isIdSeq ? (
        <p className=" bg-[#196c6c] text-white w-full text-center py-2 rounded-bl-3xl rounded-br-3xl">
          {isIdSeq}
        </p>
      ) : (
        <p className="py-2">{email}</p>
      )}
    </div>
  );
};

export default Card;
