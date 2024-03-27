import { UserDetails } from "@/pattern/user-management.tsx/molecules/user-management-table-column";
import { faker } from "@faker-js/faker";

const range = (len: number) => {
  const arr: number[] = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newUser = (): UserDetails => {
  return {
    userID: faker.number.int(1000000),
    name: faker.person.fullName(),
    role: faker.helpers.shuffle(["Agent", "Pilgrim"])[0],
    status: faker.helpers.shuffle(["active", "inactive"])[0]!,
    email: faker.helpers.shuffle([
      "aishaabdullahi@gmail.com",
      "mitchell@gmail.com",
      "cecilia@gmail.com",
      "vera@gmail.com",
    ])[0]!,
    registeredOn: faker.date.past(),
    image: faker.helpers.shuffle(["imageurl1", "imageurl2", "imageurl3"])[0]!,
    phoneNumber: faker.phone.number(),
  };
};

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): UserDetails[] => {
    const len = lens[depth]!;
    return range(len).map((_d): UserDetails => {
      return {
        ...newUser(),
      };
    });
  };

  return makeDataLevel();
}

const data = makeData(9);

export async function fetchUsers(options: {
  pageIndex: number;
  pageSize: number;
}) {
  // Simulate some network latency
  await new Promise((r) => setTimeout(r, 5000));

  return {
    rows: data.slice(
      options.pageIndex * options.pageSize,
      (options.pageIndex + 1) * options.pageSize
    ),
    pageCount: Math.ceil(data.length / options.pageSize),
    rowCount: data.length,
  };
}
