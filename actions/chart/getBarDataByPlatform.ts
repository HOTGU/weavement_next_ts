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
  date: "month" | "day" | "quarter";
  year: number;
}

export default async (params: IAnalysisParams) => {
  const { date, year } = params;

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

  const orderByDay = async () => {
    try {
      const contacts = await prisma.contact.findMany({
        where: {
          createdAt: {
            gte: new Date(`${year}-01-01T00:59:00.000Z`).toISOString(),
            lte: new Date(`${year}-12-31T00:59:00.000Z`).toISOString(),
          },
        },
        select: { createdAt: true, knowPlatform: true },
      });

      const daysArr = [
        "월요일",
        "화요일",
        "수요일",
        "목요일",
        "금요일",
        "토요일",
        "일요일",
      ];

      for (let i = 0; i < 7; i++) {
        data.series.map((item) => item.data.push(0));
        data.categories.push(daysArr[i]);
      }

      contacts.map((contact) => {
        const day = new Date(contact.createdAt).getDay();
        const dayIndex = day === 0 ? 6 : day - 1;

        data.series.map((item) => {
          if (item.name === contact.knowPlatform) {
            item.data[dayIndex] += 1;
          }
        });
      });
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.log(error);
      }

      return null;
    }
  };

  const orderByMonth = async () => {
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
              _id: {
                month: { $month: "$createdAt" },
                platform: "$knowPlatform",
              },
              count: {
                $sum: 1,
              },
            },
          },
        ],
      });

      for (let i = 0; i < 12; i++) {
        data.series.map((item) => item.data.push(0));
        data.categories.push(`${i + 1}월`);
      }

      // @ts-ignore
      contacts.map((contact) => {
        const month = contact._id.month;
        let platform = contact._id.platform;
        const count = contact.count;

        data.series.map((item) => {
          if (platform === item.name) {
            item.data[month - 1] += count;
          }
        });
      });
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.log(error);
      }

      return null;
    }
  };

  const orderByQuarter = async () => {
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
            _id: {
              month: { $month: "$createdAt" },
              platform: "$knowPlatform",
            },
            count: {
              $sum: 1,
            },
          },
        },
      ],
    });

    for (let i = 0; i < 4; i++) {
      data.series.map((item) => item.data.push(0));
      data.categories.push(`${i + 1}분기`);
    }

    // @ts-ignore
    contacts.map((contact) => {
      const month = contact._id.month;
      let platform = contact._id.platform;
      const count = contact.count;

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
    });
  };

  if (date === "day") {
    await orderByDay();
  }
  if (date === "month") {
    await orderByMonth();
  }
  if (date === "quarter") {
    await orderByQuarter();
  }

  return data;
};
