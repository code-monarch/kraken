import { faker } from "@faker-js/faker";
import { IRecentTransactions } from "@/pattern/transactions/molecules/transactions-list-table-column";

const range = (len: number) => {
  const arr: number[] = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newTransaction = (): IRecentTransactions => {
  return {
    trxID: faker.number.int(1000000),
    pilgrim: faker.person.fullName(),
    amount: faker.number.float({ min: 50, max: 100, fractionDigits: 2 }),
    agent: faker.person.fullName(),
    type: faker.helpers.shuffle(["withdrawal", "deposit"])[0]!,
    status: faker.helpers.shuffle([
      "completed",
      "flagged",
      "pending",
      "failed",
      "cancelled",
    ])[0]!,
    date: faker.date.past(),
  };
};

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): IRecentTransactions[] => {
    const len = lens[depth]!;
    return range(len).map((_d): IRecentTransactions => {
      return {
        ...newTransaction(),
      };
    });
  };

  return makeDataLevel();
}

const data = makeData(9);

export async function fetchTransactions(options: {
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
