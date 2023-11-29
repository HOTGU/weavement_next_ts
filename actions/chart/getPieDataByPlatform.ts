import prisma from "@/libs/prismadb";

interface IAnalysisParams {
  year: number;
}

export default async (params: IAnalysisParams) => {
  const { year } = params;

  try {
    const contacts = await prisma.contact.aggregateRaw({
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                {
                  $gte: [
                    "$createdAt",
                    {
                      $dateFromString: {
                        dateString: new Date(
                          `${year}-01-01T00:59:00.000Z`
                        ).toISOString(),
                      },
                    },
                  ],
                },
                {
                  $lte: [
                    "$createdAt",
                    {
                      $dateFromString: {
                        dateString: new Date(
                          `${year}-12-31T00:59:00.000Z`
                        ).toISOString(),
                      },
                    },
                  ],
                },
              ],
            },
          },
        },
        {
          $group: {
            _id: { platform: "$knowPlatform" },
            count: {
              $sum: 1,
            },
          },
        },
      ],
    });

    let data = {
      total: 0,
      labels: [
        "홈페이지",
        "블로그",
        "인스타그램",
        "페이스북",
        "유튜브",
        "기존고객",
        "소개",
        "기타",
        "알수없음",
      ],
      series: new Array(9).fill(0),
    };

    // @ts-ignore
    contacts.map((contact) => {
      const platform = contact._id.platform;
      const count = contact.count;

      const dataIndex = data.labels.findIndex(
        (dataPlatform) => dataPlatform === platform
      );
      data.total += count;
      data.series[dataIndex] = count;
    });

    return data;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }
    return null;
  }
};
