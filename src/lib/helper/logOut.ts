import LocalStore from './storage-manager'
import { AUTH_PATHS } from '../routes'
import { toast } from 'sonner'
import { baseApiSlice } from '@/redux/api/base-api'
import { ILogoutResponse } from '@/redux/types'
import { Action, EnhancedStore, StoreEnhancer, ThunkAction, ThunkDispatch, Tuple, UnknownAction } from '@reduxjs/toolkit'
import { MutationActionCreatorResult, MutationDefinition, BaseQueryFn, FetchArgs, FetchBaseQueryError, CombinedState } from '@reduxjs/toolkit/query'
import { IAuthState } from '@/redux/slices/auth'
import { IGlobalState } from '@/redux/slices/global'
import { IUserSlice } from '@/redux/slices/user-slice'
import { PersistPartial } from 'redux-persist/es/persistReducer'

let store: { dispatch: (arg0: ThunkAction<MutationActionCreatorResult<MutationDefinition<void, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>, "getUser" | "getAdmin" | "getProfile", ILogoutResponse, "baseApi">>, any, any, UnknownAction>) => Promise<any> }

export const injectStore = (_store: EnhancedStore<{ baseApi: CombinedState<{ logout: MutationDefinition<void, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>, "getUser" | "getAdmin" | "getProfile", ILogoutResponse, "baseApi"> }, "getUser" | "getAdmin" | "getProfile", "baseApi">; globalState: IGlobalState & PersistPartial; authState: IAuthState & PersistPartial; userDetails: IUserSlice & PersistPartial } & PersistPartial, Action, Tuple<[StoreEnhancer<{ dispatch: ThunkDispatch<{ baseApi: CombinedState<{ logout: MutationDefinition<void, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>, "getUser" | "getAdmin" | "getProfile", ILogoutResponse, "baseApi"> }, "getUser" | "getAdmin" | "getProfile", "baseApi">; globalState: IGlobalState & PersistPartial; authState: IAuthState & PersistPartial; userDetails: IUserSlice & PersistPartial } & PersistPartial, undefined, UnknownAction> }>, StoreEnhancer]>>) => {
  store = _store
}

export const clearLocalStorage = () => {
  LocalStore.clearStore()
  if (typeof window !== 'undefined') {
    location.replace(`${AUTH_PATHS.login}`)
  }
}

export const logoutAndClearStorage = async () => {
  await store
    .dispatch(baseApiSlice.endpoints.logout.initiate())
    .then((res) => {
      console.log("LOG OUT RESPONSE: ", res)
      clearLocalStorage()
    }).catch((err) => {
      toast.error('Unexpected error', {
        description: `${err?.data?.responseMessage ??
          'We encountered an error while logging you out, Please try again'
          }`,
      })
    })
}
