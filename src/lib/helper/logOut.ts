import { toast } from 'sonner'
import { baseApiSlice } from '@/redux/api/base-api'
import LocalStore from './storage-manager'

let store: any

export const injectStore = (_store: unknown) => {
  store = _store
}

export const logoutAndClearStorage = async () => {
  await store
    .dispatch(baseApiSlice.endpoints.logout?.initiate())
    ?.then((res: any) => {
      console.log("LOG OUT RESPONSE: ", res)
      LocalStore.clearStore()
    })?.catch((err: { data: { responseMessage: any } }) => {
      toast.error('Unexpected error', {
        description: `${err?.data?.responseMessage ??
          'We encountered an error while logging you out, Please try again'
          }`,
      })
    })
}
