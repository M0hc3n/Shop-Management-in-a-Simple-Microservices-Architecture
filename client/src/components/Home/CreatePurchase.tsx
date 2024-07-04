import { useEffect, useState } from "react";
import Combobox from "./Combobox";
import { Client } from "../types";
import axios from "axios";
import { BASE_API } from "../../api";

const CreatePurchase = () => {
  const [items, setItems] = useState("");

  const [clients, setClients] = useState<Client[]>([
    { id: 1, name: "Tom Cook" },
    { id: 2, name: "Wade Cooper" },
    { id: 3, name: "Tanya Fox" },
    { id: 4, name: "Arlene Mccoy" },
    { id: 5, name: "Devon Webb" },
  ]);
  const [client, setClient] = useState<Client | null>({
    id: 5,
    name: "Devon Webb",
  });
  const [note, setNote] = useState("");
  const [price, setPrice] = useState(0);
  const [success, setSuccess] = useState(false);

  const handleAddingPurchase = async () => {
    try {
      setSuccess(false);

      await axios.post(BASE_API.PURCHASES_SRV, {
        id: client?.id,
        name: client?.name,
        notes: note,
        items,
        price,
      });

      setSuccess(true);
    } catch (error) {
      console.log(error);
      setSuccess(false);
    }
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }
  }, [success]);

  return (
    <form className="w-[80%] py-[30px] mx-auto">
      <legend className="text-3xl font-bold mb-5 ">
        Fill the Information below to create a new purchase:
      </legend>

      <Combobox
        selected={client}
        setSelected={setClient}
        clients={clients}
        setClients={setClients}
      />

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="floating_email"
          id="floating_email"
          className="block py-3 px-0 w-full text-md text-black bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          value={items}
          onChange={(e) => setItems(e.target.value)}
        />
        <label
          htmlFor="floating_email"
          className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Items Bought (seprated by a space)
        </label>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="number"
          name="floating_price"
          id="floating_price"
          className="block py-3 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
        />
        <label
          htmlFor="floating_price"
          className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          price
        </label>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="floating_password"
          id="floating_password"
          className="block py-3 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <label
          htmlFor="floating_password"
          className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Extra Notes
        </label>
      </div>

      <button
        onClick={(e) => {
          e.preventDefault();
          handleAddingPurchase();
        }}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full sm:w-auto px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
      {success && (
        <p className="text-md text-green-500 my-2 transition-all ease-in-out duration-500">
          You've added the purchase succesfully
        </p>
      )}
    </form>
  );
};

export default CreatePurchase;
