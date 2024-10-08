'use client'
import { FC, ReactNode, useEffect } from 'react'
import { AUTH_PATHS } from '@/lib/routes'
import LocalStore from '@/lib/helper/storage-manager'
import { LOGIN_API_KEY } from '@/lib/constants'
import { useRouter } from 'next/navigation'

interface IProps {
  children: ReactNode
}

const AuthGuard: FC<IProps> = ({ children }) => {
  const { replace } = useRouter()
  const loginApiKey = LocalStore.getItem({ key: LOGIN_API_KEY })

  useEffect(() => {
    if (loginApiKey) {
      return
    } else {
      replace(`${AUTH_PATHS.login}`)
    }
  }, [loginApiKey, replace])

  return <>{children}</>
}

export default AuthGuard
