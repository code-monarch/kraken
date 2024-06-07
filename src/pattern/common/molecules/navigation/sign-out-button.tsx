'use client'
import LogoutIcon from '../../atoms/icons/logout-icon'
import { logoutAndClearStorage } from '@/lib/helper/logout'

const SignOutButton = () => {
  return (
    <button
      className='bg-accent w-full h-[40px] flex items-center justify-start space-x-[8px] text-[1.125rem] text-[hsla(215,23%,40%,1)] text-center font-raleway font-medium !whitespace-pre px-4 py-[10px] cursor-pointer'
      onClick={()=>logoutAndClearStorage()}
    >
      <LogoutIcon />
      <span>Sign out</span>
    </button>
  )
}

export default SignOutButton
