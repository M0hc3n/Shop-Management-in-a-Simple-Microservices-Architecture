import CreateClientForm from "../components/CreateClient/CreateClientForm";

const CreateClient = ({
  newClient,
  setNewClient,
  handleSubmit,
}: {
  newClient: string;
  setNewClient: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: () => void;
}) => {
  return (
    <div className="flex flex-col">
      <CreateClientForm
        newClient={newClient}
        setNewClient={setNewClient}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default CreateClient;
