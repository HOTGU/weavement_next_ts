import prisma from "@/libs/prismadb";

interface IChartDataTypes {
  categories: string[];
  series: { name: StateKind; data: number[] }[];
}

interface IAnalysisParams {
  date: "month" | "quarter" | "day";
  year: number;
}

type StateKind = "문의" | "계약";

export default async (params: IAnalysisParams) => {
  const { date, year } = params;

  let data = {
    categories: [],
    series: [
      { name: "문의", data: [] },
      { name: "계약", data: [] },
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
        select: { createdAt: true, state: true },
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

        data.series[0].data[dayIndex] += 1;
        if (contact.state === "계약" || contact.state === "완료") {
          data.series[1].data[dayIndex] += 1;
        }
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
              _id: { month: { $month: "$createdAt" }, state: "$state" },
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
        const state = contact._id.state;
        const count = contact.count;

        data.series[0].data[month - 1] += count;

        if (state === "계약" || state === "완료") {
          data.series[1].data[month - 1] += count;
        }
      });
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.log(error);
      }
      return null;
    }
  };

  const orderByQuarter = async () => {
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
              _id: { month: { $month: "$createdAt" }, state: "$state" },
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

      //@ts-ignore
      contacts.map((contact) => {
        const month = contact._id.month;
        const state = contact._id.state;
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
            data.series[0].data[i] += count;

            if (state === "계약" || state === "완료") {
              data.series[1].data[i] += count;
            }
          }
        }
      });
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.log(error);
      }
      return null;
    }
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
