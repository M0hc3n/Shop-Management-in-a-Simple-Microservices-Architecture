import { Purchase } from "../types";

const SinglePurchase = ({ clientName, date, items, notes }: Purchase) => {

  return (
    <div className="w-full border-l-[20px] border-blue-600 flex justify-between items-center px-[30px] py-[20px] rounded-2xl bg-slate-300">
      <div className="flex flex-col gap-[30px]">
        <p className="text-xl text-black dark:text-black"> {clientName ?? "Alpha Zero"} </p>

        <span className="text-md text-gray-500 dark:text-gray-400">
          {" "}
          {items.split(" ").join(", ")}{" "}
        </span>

        <p className="text-md font-bold text-black dark:text-black">
          {" "}
          Note:{" "}
          <span className="text-md text-gray-500 dark:text-gray-400">
            {" "}
            {notes ?? "No Note Provided "}{" "}
          </span>{" "}
        </p>
      </div>
      <p className="text-md font-bold text-gray-500 dark:text-gray-500"> {date}</p>
    </div>
  );
};

export default SinglePurchase;
