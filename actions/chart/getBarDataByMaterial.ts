import prisma from "@/libs/prismadb";
import getSelectOptions from "../getSelectOptions";

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

    const categories = getSelectOptions().meterialOptions.map(
      (item) => item.value
    );

    const data = {
      categories,
      series: [{ data: new Array(categories.length).fill(0) }],
    } as IChartDataTypes;

    // @ts-ignore
    contacts.map((contact) => {
      const materials = contact._id.material;
      const count = contact.count;

      if (materials) {
        materials.map((material: string) => {
          const dataIndex = data.categories.findIndex(
            (dataMaterial) => dataMaterial === material
          );
          data.series[0].data[dataIndex] += count;
        });
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
