import { formatDate } from "@/lib/helper/format-date";
import { ITransactionsTableHeaderProps } from "@/pattern/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Get the current date
const currentDate = new Date();

// Defaults to First day of current month
const defaultStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

const initialState: Pick<ITransactionsTableHeaderProps, "searchQuery" |
    "status"
    | "order"
    | "startDate"
    | "endDate"
    | "transactionType"> = {
    searchQuery: "",
    status: undefined,
    order: "asc",
    startDate: formatDate(`${defaultStartDate}`),
    endDate: formatDate(`${currentDate}`),
    transactionType: undefined
};

export const transactionsFilterSlice = createSlice({
    name: "transactionsFilter",
    initialState,
    reducers: {
        setSearchQueryFilter: (state, action: PayloadAction<ITransactionsTableHeaderProps['searchQuery']>) => {
            state.searchQuery = action.payload;
        },
        setStatusFilter: (state, action: PayloadAction<ITransactionsTableHeaderProps['status']>) => {
            state.status = action.payload;
        },
        setOrderFilter: (state, action: PayloadAction<ITransactionsTableHeaderProps['order']>) => {
            state.order = action.payload;
        },
        setStartDateFilter: (state, action: PayloadAction<ITransactionsTableHeaderProps['startDate']>) => {
            state.startDate = action.payload;
        },
        setEndDateFilter: (state, action: PayloadAction<ITransactionsTableHeaderProps['endDate']>) => {
            state.endDate = action.payload;
        },
        setTransactionTypeFilter: (state, action: PayloadAction<ITransactionsTableHeaderProps['transactionType']>) => {
            state.transactionType = action.payload;
        },
    },
});

export const {
    setSearchQueryFilter,
    setStatusFilter,
    setOrderFilter,
    setStartDateFilter,
    setEndDateFilter,
    setTransactionTypeFilter
} = transactionsFilterSlice.actions;

export default transactionsFilterSlice.reducer;
