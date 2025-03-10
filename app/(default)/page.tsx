import getPortfolios from "@/actions/db/getPortfolios";
import Container from "@/components/Container";
import Navbar from "@/components/navbar/Navbar";
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
      <div className="h-[300vh]">
        <HomeScreen />
        <div className="bg-black h-[200vh] pt-64">
          <Container>
            <div>
              <div className="flex justify-between text-white font-ibm">
                <div className="w-1/4 ">
                  위브먼트에게는 조형물의 크기도 목적도 소재도 제한이 없습니다
                  예산과 일정 목적에 알맞은 예술적인 결과를 만들어갑니다
                </div>
                <div className="w-4/6 text-8xl ">
                  우리는 고객들에게 대단한 경험을 하게 해줄 수 있다
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
      {/* <HomeScreen />
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
      </div> */}
    </>
  );
}
