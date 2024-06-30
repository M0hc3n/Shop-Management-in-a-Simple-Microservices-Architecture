const CreateClientForm = ({
  newClient,
  setNewClient,
}: {
  newClient: string;
  setNewClient: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <form className="w-[80%] py-[30px] mx-auto">
      <legend className="text-3xl font-bold mb-5 ">
        Fill the Information below to create a new client:
      </legend>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="floating_email"
          id="floating_email"
          className="block py-3 px-0 w-full text-md text-black bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          value={newClient}
          onChange={e => setNewClient(e.target.value)}
        />
        <label
          htmlFor="floating_email"
          className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Full Name
        </label>
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full sm:w-auto px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
};

export default CreateClientForm;
