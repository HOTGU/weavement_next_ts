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
      <section aria-labelledby="about-title" className="homeColumn">
        <HomeAbout />
      </section>
      <section aria-labelledby="portfolio" className="homeColumn bg-zinc-100">
        <HomePortfolio portfolios={data.portfolios} />
      </section>
      <section aria-labelledby="process" className="homeColumn">
        <HomeProcess />
      </section>
      <section
        aria-labelledby="contact"
        className="homeColumn relative bg-accent text-white"
      >
        <HomeBottom />
      </section>
    </>
  );
}
