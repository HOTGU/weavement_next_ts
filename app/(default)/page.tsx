import getPortfolios from "@/actions/db/getPortfolios";

import metadataConfig from "@/constants/metadataConfig";
import HomeClient from "./HomeClient";
import MainScreen from "@/components/screens/home/MainScreen";

export const metadata = metadataConfig.homeMetadata;

export default async function Home() {
  const take = 6;
  const data = await getPortfolios({ take });

  return (
    <>
      <div className="">
        {/* 풀화면을 위해 여기서 main screen component */}
        <MainScreen />
        <HomeClient portfolios={data.portfolios} />
      </div>
    </>
  );
}
