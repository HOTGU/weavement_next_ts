import {
  IAnalysisParams,
  IChartDataTypes,
} from "@/app/(admin)/admin/analysis/page";
import prisma from "@/libs/prismadb";

interface AggreateContactType {
  _id: {
    month: number;
    state: "문의" | "상담" | "계약" | "완료" | "미수신" | "불발";
  };
  count: number;
}

const initTotalAndSuccess = ({
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

const addDataTotalAndSuccess = ({
  contact,
  date,
  data,
}: {
  contact: AggreateContactType;
  date: "quarter" | "month" | "year";
  data: IChartDataTypes;
}) => {
  const month = contact._id.month;
  const state = contact._id.state;
  const count = contact.count;

  if (date === "month") {
    data.series.map((item) => {
      if (item.name === "문의") {
        item.data[month - 1] += count;
      }
      if (item.name === "계약") {
        if (state === "계약" || state === "완료") {
          item.data[month - 1] += count;
        }
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
          if (item.name === "문의") {
            item.data[i] += count;
          }
          if (item.name === "계약") {
            if (state === "계약" || state === "완료") {
              item.data[i] += count;
            }
          }
        });
      }
    }
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
            _id: { month: { $month: "$createdAt" }, state: "$state" },
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
        { name: "문의", data: [] },
        { name: "계약", data: [] },
      ],
    } as IChartDataTypes;

    initTotalAndSuccess({ data, date });

    // @ts-ignore
    contacts.map((contact) => {
      addDataTotalAndSuccess({ date, contact, data });
    });

    return data;
  } catch (error: any) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }

    throw new Error(error);
  }
};
