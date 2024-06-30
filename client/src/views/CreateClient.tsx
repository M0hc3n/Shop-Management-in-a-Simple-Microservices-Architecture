import CreateClientForm from "../components/CreateClient/CreateClientForm";

const CreateClient = ({
  newClient,
  setNewClient,
}: {
  newClient: string;
  setNewClient: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="flex flex-col">
      <CreateClientForm newClient={newClient} setNewClient={setNewClient} />
    </div>
  );
};

export default CreateClient;
