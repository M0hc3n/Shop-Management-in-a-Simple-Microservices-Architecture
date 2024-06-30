import CreatePurchase from "../components/Home/CreatePurchase";
import LatestPurchases from "../components/Home/LatestPurchases";

const Home = () => {
  return (
    <div className="flex flex-col">
      <CreatePurchase />
      <LatestPurchases />
    </div>
  );
};

export default Home;
