import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import clsx from "clsx";
import { useState } from "react";

import Modal from "react-modal";
import CreateClient from "../../views/CreateClient";
import { Client } from "../types";
import axios from "axios";

export default function Example({
  selected,
  setSelected,
  clients,
  setClients,
}: {
  selected: Client | null;
  setSelected: React.Dispatch<React.SetStateAction<Client | null>>;
  clients: Client[];
  setClients: React.Dispatch<React.SetStateAction<Client[]>>;
}) {
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newClient, setNewClient] = useState("");

  const filteredPeople =
    query === ""
      ? clients
      : clients.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  const handleAddingClient = async () => {
    try {
      const res = await axios.post("http://localhost:8001", {
        clientName: newClient,
      });

      if (res.status == 201) {
        setClients((prev) => prev.concat(res.data.data));
        setIsModalOpen(false);
        setSelected(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" w-full py-5">
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <CreateClient
          newClient={newClient}
          setNewClient={setNewClient}
          handleSubmit={handleAddingClient}
        />
      </Modal>

      <p className="text-md text-gray-500 dark:text-gray-400 mb-2">
        Enter client name:
        <p
          onClick={() => setIsModalOpen(true)}
          className="underline cursor-pointer"
        >
          {" "}
          (click here to add new clients)
        </p>
      </p>

      <Combobox
        value={selected}
        onChange={(value) => setSelected(value)}
        onClose={() => setQuery("")}
      >
        <div className="relative">
          <ComboboxInput
            className={clsx(
              "w-full rounded-lg border border-black focus:border-blue-600 bg-white py-1.5 pr-8 pl-3 text-sm/6 text-black",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            )}
            displayValue={(person: { id: number; name: string }) =>
              person?.name
            }
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>

        <ComboboxOptions
          anchor="bottom"
          transition
          className={clsx(
            "w-[var(--input-width)] rounded-xl border border-white/5 bg-black p-1 [--anchor-gap:var(--spacing-1)] empty:invisible",
            "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
          )}
        >
          {filteredPeople.map((person) => (
            <ComboboxOption
              key={person.id}
              value={person}
              className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
            >
              <div className="text-sm/6 text-white ">{person.name}</div>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
}
