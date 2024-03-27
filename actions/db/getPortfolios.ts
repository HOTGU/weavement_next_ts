import prisma from "@/libs/prismadb";
import { contactS3 } from "@/libs/s3config";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getPlaiceholder } from "plaiceholder";

export interface IPortfolioParams {
  isRep?: boolean;
  page?: number;
  take?: number;
}

export default async ({ isRep = false, page, take = 10 }: IPortfolioParams) => {
  try {
    let skip = 0;
    const query: any = {};
    if (page) {
      skip = take * (page - 1);
    }
    if (isRep) {
      query.isRep = true;
    }
    const allPortfolios = await prisma.portfolio.count();
    const portfolios = await prisma.portfolio.findMany({
      where: query,
      take,
      skip,
      orderBy: { createdAt: "desc" },
    });

    const portfoliosWithBlurData = await Promise.all(
      portfolios.map(async (portfolio) => {
        const fileKey = portfolio.thumb.split("com/")[1];
        const command = new GetObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET,
          Key: fileKey,
        });

        const res = await contactS3.send(command);
        const stream = res.Body as Blob;

        //@ts-ignore
        const buffer = Buffer.concat(await stream.toArray());
        const { base64: blurData } = await getPlaiceholder(buffer, {
          size: 10,
        });
        return { ...portfolio, blurData };
      })
    );

    const PAGE = Math.ceil(allPortfolios / take);

    return { portfolios: portfoliosWithBlurData, allPage: PAGE };
  } catch (error: any) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }
    throw new Error(error);
  }
};
