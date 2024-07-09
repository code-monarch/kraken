export interface ILogoutResponse {
    error: boolean,
    responseCode: string,
    responseMessage: string,
    data: boolean
}

export interface IChartResponse {
    xAxis: Array<number>,
    yAxis: {
        deposit: {
            total_volume: Array<number>,
            total_tranx: Array<number>,
            average_tranx: Array<number>,
        },
        Withdrawal: {
            total_volume: Array<number>,
            total_tranx: Array<number>,
            average_tranx: Array<number>,
        },
        Cashout: {
            total_volume: Array<number>,
            total_tranx: Array<number>,
            average_tranx: Array<number>,
        }
    }
}