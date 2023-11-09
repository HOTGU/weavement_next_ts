import prisma from "@/libs/prismadb";
import { parseISO } from "date-fns";

export interface IContactParams {}

interface DataTypes {
  categories: string[];
  series: {
    total: number[];
    success: number[];
  };
}

export interface IStateChartParams {
  date: "month" | "year" | "quarter";
  year: number;
}

interface AggreateContactType {
  _id: {
    month: number;
    state: "문의" | "상담" | "계약" | "완료" | "미수신" | "불발";
  };
  count: number;
}

const initTotalAndSuccess = ({
  date,
  total,
  success,
}: {
  date: "quarter" | "month" | "year";
  total: number[];
  success: number[];
}) => {
  if (date === "month") {
    for (let i = 0; i < 12; i++) {
      total.push(0);
      success.push(0);
    }
  }
  if (date === "quarter") {
    for (let i = 0; i < 4; i++) {
      total.push(0);
      success.push(0);
    }
  }
};

const addDataTotalAndSuccess = ({
  contact,
  date,
  total,
  success,
}: {
  contact: AggreateContactType;
  date: "quarter" | "month" | "year";
  total: number[];
  success: number[];
}) => {
  const month = contact._id.month;
  const state = contact._id.state;
  const count = contact.count;

  if (date === "month") {
    total[month - 1] += count;
    if (state === "계약" || state === "완료") {
      success[month - 1] += count;
    }
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
        total[i] += count;
        if (state === "계약" || state === "완료") {
          success[i] += count;
        }
      }
    }
  }
};

const setData = ({
  data,
  total,
  date,
  success,
}: {
  data: DataTypes;
  date: "quarter" | "month" | "year";
  total: number[];
  success: number[];
}) => {
  data.series.total = total;
  data.series.success = success;

  if (date === "month") {
    data.categories = [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ];
  }

  if (date === "quarter") {
    data.categories = ["1분기", "2분기", "3분기", "4분기"];
  }
};

export default async (params: IStateChartParams) => {
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
      series: {
        total: [],
        success: [],
      },
    } as DataTypes;
    let total = [] as number[];
    let success = [] as number[];

    initTotalAndSuccess({ date, total, success });

    // @ts-ignore
    contacts.map((contact) => {
      addDataTotalAndSuccess({ date, contact, total, success });
    });

    setData({ date, data, total, success });

    return data;
  } catch (error: any) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }

    throw new Error(error);
  }
};
