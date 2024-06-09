'use client'
import LocalStore from '@/lib/helper/storage-manager'
import { toast } from 'sonner'
import { useLogoutMutation } from '@/redux/services/auth/logout.api-slice'
import LoaderDark from '../../atoms/icons/loader-dark'
import LogoutIcon from '../../atoms/icons/logout-icon'
import { LOGIN_API_KEY, SERVICE_ACCOUNT_API_KEY } from '@/lib/constants'

const SignOutButton = () => {
  const [logout, { isLoading }] = useLogoutMutation()

  const logoutAndClearStorage = async () => {
    const loginApiKey = LocalStore.getItem({ key: LOGIN_API_KEY })
    const serviceAccountApiKey = LocalStore.getItem({
      key: SERVICE_ACCOUNT_API_KEY,
    })
    if (loginApiKey || serviceAccountApiKey) {
      logout()
        .unwrap()
        .then((res: any) => {
          console.log('LOG OUT RESPONSE: ', res)
          LocalStore.clearStore()
        })
        ?.catch((err: { data: { responseMessage: any } }) => {
          toast.error('Unexpected error', {
            description: `${
              err?.data?.responseMessage ??
              'We encountered an error while logging you out, Please try again'
            }`,
          })
        })
    } else {
      return LocalStore.clearStore()
    }
  }
  return (
    <button
      className='bg-accent w-full h-[40px] flex items-center justify-start space-x-[8px] text-[1.125rem] text-[hsla(215,23%,40%,1)] text-center font-raleway font-medium !whitespace-pre px-4 py-[10px] cursor-pointer'
      onClick={() => logoutAndClearStorage()}
    >
      {isLoading ? <LoaderDark className='animate-spin' /> : <LogoutIcon />}
      <span>{isLoading ? 'logging you out...' : 'Log out'}</span>
    </button>
  )
}

export default SignOutButton
