import { Purchase } from "../types";
import SinglePurchase from "./Purchase";

const purchases: Purchase[] = [
  {
    clientName: "Joe Doe",
    date: "today",
    note: "No notes provided",
    items: ["Potatoes", "Tomatoes", "Cocatoes"],
  },
  {
    clientName: "Joe Doe",
    date: "today",
    note: "No notes provided",
    items: ["Potatoes", "Tomatoes", "Cocatoes"],
  },
  {
    clientName: "Joe Doe",
    date: "today",
    note: "No notes provided",
    items: ["Potatoes", "Tomatoes", "Cocatoes"],
  },
  {
    clientName: "Joe Doe",
    date: "today",
    note: "No notes provided",
    items: ["Potatoes", "Tomatoes", "Cocatoes"],
  },
  {
    clientName: "Joe Doe",
    date: "today",
    note: "No notes provided",
    items: ["Potatoes", "Tomatoes", "Cocatoes"],
  },
  {
    clientName: "Joe Doe",
    date: "today",
    note: "No notes provided",
    items: ["Potatoes", "Tomatoes", "Cocatoes"],
  },
];

const LatestPurchases = () => {
  return (
    <div className="w-[80%] py-[30px] mx-auto">
      <h3 className="text-3xl font-bold mb-5 ">Browse latest purchases :</h3>

      <div className="flex flex-col gap-[20px]">
        {purchases.map((purchase, index) => (
          <SinglePurchase key={index} {...purchase} />
        ))}
      </div>
    </div>
  );
};

export default LatestPurchases;
