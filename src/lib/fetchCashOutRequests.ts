import { faker } from "@faker-js/faker";
import { ICashOutRequestTicketCardProps } from "@/pattern/cashout-request/organisms/cash-out-request-ticket-card";
import cardAvatar from '@/public/images/card-avatar.png'

const range = (len: number) => {
    const arr: number[] = [];
    for (let i = 0; i < len; i++) {
        arr.push(i);
    }
    return arr;
};

const newCashOutRequest = (): ICashOutRequestTicketCardProps => {
    return {
        amount: faker.number.float({ min: 10000, max: 1000000, fractionDigits: 2 }),
        status: faker.helpers.shuffle([
            "Approved",
            "Declined",
            "Pending",
        ])[0]!,
        ticketId: faker.number.int(300),
        ticketNumber: faker.number.int(1000000),
        userName: faker.person.fullName(),
        userImage: cardAvatar,
        date: faker.date.past() as Date,
    };
};

export function makeData(...lens: number[]) {
    const makeDataLevel = (depth = 0): ICashOutRequestTicketCardProps[] => {
        const len = lens[depth]!;
        return range(len).map((_d): ICashOutRequestTicketCardProps => {
            return {
                ...newCashOutRequest(),
            };
        });
    };

    return makeDataLevel();
}

const data = makeData(24);

export async function fetchCashOutRequest() {
    // Simulate some network latency
    await new Promise((r) => setTimeout(r, 500));

    return {
        data: data,
    };
}
