import getPortfolios from "@/actions/db/getPortfolios";

import HomeAdmin from "@/components/screens/home/HomeAdmin";
import HomeScreen from "@/components/screens/home/HomeScreen";
import metadataConfig from "@/constants/metadataConfig";

export const metadata = metadataConfig.homeMetadata;

export default async function Home() {
  const take = 6;
  const data = await getPortfolios({ take });

  return (
    <>
      <div className="">
        <HomeScreen />
        <HomeAdmin />
      </div>
    </>
  );
}
