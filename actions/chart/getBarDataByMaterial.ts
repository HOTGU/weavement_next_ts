import prisma from "@/libs/prismadb";

interface IChartDataTypes {
  categories: string[];
  series: { data: number[] }[];
}

interface IAnalysisParams {
  year: number;
}

export default async (params: IAnalysisParams) => {
  try {
    const { year } = params;

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
            _id: { material: "$meterial" },
            count: {
              $sum: 1,
            },
          },
        },
      ],
    });

    const data = {
      categories: [
        "EPS",
        "목재",
        "FRP",
        "금속",
        "3D프린팅",
        "패브릭",
        "에어",
        "ALC",
        "폼보드",
        "포맥스",
        "종이",
        "레진",
        "디자인",
        "기타",
      ],
      series: [{ data: new Array(14).fill(0) }],
    } as IChartDataTypes;

    // @ts-ignore
    contacts.map((contact) => {
      const materials = contact._id.material;
      const count = contact.count;

      materials.map((material: string) => {
        const dataIndex = data.categories.findIndex(
          (dataMaterial) => dataMaterial === material
        );
        data.series[0].data[dataIndex] += count;
      });
    });

    return data;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }
    return null;
  }
};
