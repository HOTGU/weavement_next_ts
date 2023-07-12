import getPortfolios from "@/actions/db/getPortfolios";
import HomeAbout from "@/components/home/HomeAbout";
import HomeBottom from "@/components/home/HomeBottom";
import HomePortfolio from "@/components/home/HomePortfolio";
import HomeProcess from "@/components/home/HomeProcess";
import HomeScreen from "@/components/home/HomeScreen";

export default async function Home() {
  const data = await getPortfolios({});
  const repPortfolios = data.portfolios.filter((portfolio) => portfolio.isRep);

  return (
    <>
      <HomeScreen portfolios={repPortfolios} />
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
