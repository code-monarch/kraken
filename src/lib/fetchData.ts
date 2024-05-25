import { faker } from "@faker-js/faker";

interface IActivity {
  logID: number;
  type: string;
  details: string;
  date: Date;
}

export type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
  status: "relationship" | "complicated" | "single";
  subRows?: Person[];
};

const range = (len: number) => {
  const arr: number[] = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newActivity = (): IActivity => {
  return {
    logID: faker.number.int(1000),
    type: faker.helpers.shuffle([
      "Login",
      "Export",
      "User Update",
      "Transaction",
      "Report",
      "Access",
    ])[0]!,
    details: faker.helpers.shuffle([
      "Successful",
      "CSV exported",
      "John Doe Details",
      "WIthdrawal",
      "Dashboard Login",
      "Graphic Analysis",
    ])[0]!,
    date: faker.date.past(),
  };
};

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): IActivity[] => {
    const len = lens[depth]!;
    return range(len).map((_d): IActivity => {
      return {
        ...newActivity(),
      };
    });
  };

  return makeDataLevel();
}

const data = makeData(10000);

export async function fetchData(options: {
  pageIndex: number;
  pageSize: number;
}) {
  // Simulate some network latency
  await new Promise((r) => setTimeout(r, 500));

  return {
    rows: data.slice(
      options.pageIndex * options.pageSize,
      (options.pageIndex + 1) * options.pageSize
    ),
    pageCount: Math.ceil(data.length / options.pageSize),
    rowCount: data.length,
  };
}
