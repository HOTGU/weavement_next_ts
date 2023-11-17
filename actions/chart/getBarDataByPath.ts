import prisma from "@/libs/prismadb";

interface IChartDataTypes {
  categories: string[];
  series: { data: number[] }[];
}

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
            _id: { path: "$contactPath" },
            count: {
              $sum: 1,
            },
          },
        },
      ],
    });

    const data = {
      categories: [
        "홈페이지",
        "대표전화(HP)",
        "대표문자(HP)",
        "블로그(전화)",
        "블로그(문자)",
        "대표메일",
        "카카오톡",
        "카카오톡(채널)",
        "인스타(전화)",
        "인스타(문자)",
        "인스타(DM)",
        "유튜브(전화)",
        "유튜브(문자)",
        "기타",
      ],
      series: [{ data: new Array(14).fill(0) }],
    } as IChartDataTypes;

    //@ts-ignore
    contacts.map((contact) => {
      const path = contact._id.path;
      const count = contact.count;

      const index = data.categories.findIndex((value) => value === path);
      if (index > -1) {
        data.series[0].data[index] += count;
      }
    });

    return data;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }
    return null;
  }
};
