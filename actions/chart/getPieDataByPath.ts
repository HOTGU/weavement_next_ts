import { PATH_MAP, type PathKind } from "@/constants/contactPath";
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
                          `${year}-01-01T00:59:00.000Z`,
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
                          `${year}-12-31T00:59:00.000Z`,
                        ).toISOString(),
                      },
                    },
                  ],
                },
              ],
            },
          },
        },

        // 문의경로별로 집계
        {
          $group: {
            _id: {
              contactPath: "$contactPath",
            },
            count: {
              $sum: 1,
            },
          },
        },
      ],
    });

    const labels: PathKind[] = [
      "홈페이지",
      "대표메일",
      "대표전화",
      "블로그1",
      "블로그2",
      "블로그3",
      "블로그4",
      "카톡채널",
      "인스타",
      "크몽",
      "쇼핑",
      "기타",
    ];

    const data = {
      total: 0,
      labels,
      series: new Array(labels.length).fill(0),
    };

    // @ts-ignore aggregateRaw 타입
    contacts.forEach((contact) => {
      const originalPath = contact._id.contactPath;

      // 실제 문의경로 → 통합된 문의경로
      const path = PATH_MAP[originalPath] ?? "기타";

      const count = contact.count;

      const dataIndex = labels.findIndex((label) => label === path);

      if (dataIndex !== -1) {
        data.series[dataIndex] += count;
        data.total += count;
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
