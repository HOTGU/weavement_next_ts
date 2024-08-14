import getPortfolios from "@/actions/db/getPortfolios";
import HomeAbout from "@/components/screens/home/HomeAbout";
import HomeBottom from "@/components/screens/home/HomeBottom";
import HomePortfolio from "@/components/screens/home/HomePortfolio";
import HomeProcess from "@/components/screens/home/HomeProcess";
import HomeScreen from "@/components/screens/home/HomeScreen";
import metadataConfig from "@/constants/metadataConfig";

export const metadata = metadataConfig.homeMetadata;

export default async function Home() {
  const take = 6;
  const data = await getPortfolios({ take });

  return (
    <>
      <HomeScreen />
      <div className="homeColumn">
        <HomeAbout />
      </div>
      <div className="homeColumn bg-zinc-100">
        <HomePortfolio portfolios={data.portfolios} />
      </div>
      <div className="homeColumn">
        <HomeProcess />
      </div>
      <div className="homeColumn relative bg-accent text-white">
        <HomeBottom />
      </div>
    </>
  );
}
