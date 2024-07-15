'use client'
import LocalStore from '@/lib/helper/storage-manager'
import { LOGIN_API_KEY, SERVICE_ACCOUNT_API_KEY } from '@/lib/constants'
import LogoutIcon from '../../atoms/icons/logout-icon'
import { useLogoutMutation } from '@/redux/services/auth/logout.api-slice'
import { useRouter } from 'next/navigation'
import { AUTH_PATHS } from '@/lib/routes'
import { ErrorModal } from '../../organisms/error-modal'
import { show } from '@ebay/nice-modal-react'
import { toast } from 'sonner'

const SignOutButton = () => {
  const { replace } = useRouter()
  const [logout, { isLoading }] = useLogoutMutation()

  const logoutAndClearStorage = async () => {
    logout()
      .unwrap()
      .then(res => {
        LocalStore.clearStore()
        replace(`${AUTH_PATHS.login}`)
      })
      .catch(error => {
        if ('error' in error && error?.error === 'TypeError: Failed to fetch') {
          show(ErrorModal, {
            message:
              'Something went wrong, please check your network and try again',
          })
        } else {
          // display error message
          toast.error('Unexpected error', {
            description: `${
              error?.data?.responseMessage ??
              'We encountered an error while trying to log you out'
            }`,
            duration: 8000,
            cancel: {
              label: 'Close',
              onClick: () => console.log('Close!'),
            },
          })
        }
      })

    // const loginApiKey = LocalStore.getItem({ key: LOGIN_API_KEY })
    // const serviceAccountApiKey = LocalStore.getItem({
    //   key: SERVICE_ACCOUNT_API_KEY,
    // })
    // if (loginApiKey || serviceAccountApiKey) {
    //   LocalStore.clearStore()
    // }
  }
  return (
    <button
      className='w-full h-[40px] flex items-center justify-start space-x-[8px] text-[1.125rem] text-[hsla(215,23%,40%,1)] disabled:text-input text-center font-raleway font-medium !whitespace-pre px-4 py-[10px] disabled:cursor-not-allowed'
      onClick={() => logoutAndClearStorage()}
      disabled={isLoading}
    >
      <LogoutIcon />
      <span>Log out</span>
    </button>
  )
}

export default SignOutButton
