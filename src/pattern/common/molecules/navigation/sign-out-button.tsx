'use client'
import LocalStore from '@/lib/helper/storage-manager'
import { LOGIN_API_KEY, SERVICE_ACCOUNT_API_KEY } from '@/lib/constants'
import LogoutIcon from '../../atoms/icons/logout-icon'

const SignOutButton = () => {

  const logoutAndClearStorage = async () => {
    const loginApiKey = LocalStore.getItem({ key: LOGIN_API_KEY })
    const serviceAccountApiKey = LocalStore.getItem({
      key: SERVICE_ACCOUNT_API_KEY,
    })
    if (loginApiKey || serviceAccountApiKey) {
      LocalStore.clearStore()
    }
  }
  return (
    <button
      className='w-full h-[40px] flex items-center justify-start space-x-[8px] text-[1.125rem] text-[hsla(215,23%,40%,1)] disabled:text-input text-center font-raleway font-medium !whitespace-pre px-4 py-[10px] disabled:cursor-not-allowed'
      onClick={() => logoutAndClearStorage()}
    >
      <LogoutIcon />
      <span>Log out</span>
    </button>
  )
}

export default SignOutButton
