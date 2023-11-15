import prisma from "@/libs/prismadb";

interface IChartDataTypes {
  categories: string[];
  series: { name: PlatformKind; data: number[] }[];
}

type PlatformKind =
  | "홈페이지"
  | "블로그"
  | "인스타그램"
  | "페이스북"
  | "유튜브"
  | "기존고객"
  | "소개"
  | "기타"
  | "알수없음";

interface IAnalysisParams {
  date: "month" | "year" | "quarter";
  year: number;
}

const InitData = ({
  data,
  date,
}: {
  data: IChartDataTypes;
  date: "quarter" | "month" | "year";
}) => {
  let length = 0;
  if (date === "month") length = 12;
  if (date === "quarter") length = 4;

  for (let i = 0; i < length; i++) {
    data.series.map((item) => item.data.push(0));
    data.categories.push(`${i + 1}`);
  }
};

export default async (params: IAnalysisParams) => {
  try {
    const { date, year } = params;

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
            _id: { month: { $month: "$createdAt" }, platform: "$knowPlatform" },
            count: {
              $sum: 1,
            },
          },
        },
      ],
    });

    let data = {
      categories: [],
      series: [
        { name: "홈페이지", data: [] },
        { name: "블로그", data: [] },
        { name: "인스타그램", data: [] },
        { name: "페이스북", data: [] },
        { name: "유튜브", data: [] },
        { name: "기존고객", data: [] },
        { name: "소개", data: [] },
        { name: "기타", data: [] },
        { name: "알수없음", data: [] },
      ],
    } as IChartDataTypes;

    InitData({ data, date });

    // @ts-ignore
    contacts.map((contact) => {
      const month = contact._id.month;
      let platform = contact._id.platform;
      const count = contact.count;

      if (date === "month") {
        data.series.map((item) => {
          if (platform === item.name) {
            item.data[month - 1] += count;
          }
        });
      }

      if (date === "quarter") {
        const quarterArr = [
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9],
          [10, 11, 12],
        ];

        for (let i = 0; i < quarterArr.length; i++) {
          const checkQuarter = quarterArr[i].includes(month);
          if (checkQuarter) {
            data.series.map((item) => {
              if (platform === item.name) {
                item.data[i] += count;
              }
            });
          }
        }
      }
    });

    return data;
  } catch (error: any) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }

    throw new Error(error);
  }
};
