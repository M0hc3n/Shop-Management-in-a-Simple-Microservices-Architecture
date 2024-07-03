import { KeyedMutator } from "swr";
import SinglePurchase from "./Purchase";

const LatestPurchases = ({
  data,
  mutate,
}: {
  data: unknown;
  mutate: KeyedMutator<unknown>;
}) => {
  if (!data) return <></>;

  return (
    <div className="w-[80%] py-[30px] mx-auto gap-[30px] flex flex-col">
      <div className="w-full flex justify-between items-center ">
        <h3 className="text-3xl font-bold mb-5 ">Browse latest purchases :</h3>
        <button
          onClick={(e) => {
            e.preventDefault();

            mutate();
          }}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md max-w-fit sm:w-auto px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Refesh
        </button>
      </div>

      <div className="flex flex-col gap-[20px]">
        {[].concat(...Object.values(data?.data)).map((element, index) => (
          <SinglePurchase key={index} {...element} />
        ))}
      </div>
    </div>
  );
};

export default LatestPurchases;
