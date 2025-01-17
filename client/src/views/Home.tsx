import { BASE_API } from "../api";
import CreatePurchase from "../components/Home/CreatePurchase";
import LatestPurchases from "../components/Home/LatestPurchases";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Home = () => {
  const { data, mutate } = useSWR(BASE_API.QUERY_SRV, fetcher);

  return (
    <div className="flex flex-col">
      <CreatePurchase />
      <LatestPurchases data={data} mutate={mutate} />
    </div>
  );
};

export default Home;
