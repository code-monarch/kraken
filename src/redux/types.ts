export interface ILogoutResponse {
    error: boolean,
    responseCode: string,
    responseMessage: string,
    data: boolean
}

export interface IChartResponse {
    xAxis: Array<number>,
    yAxis: [
        {
            name: "deposit",
            data: Array<number>
        },
        {
            name: "Withdrawal",
            data: Array<number>
        },
        {
            name: "Cashout",
            data: Array<number>
        },
        {
            name: "Disbursement ",
            data: Array<number>
        }
    ]
}