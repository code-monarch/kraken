'use client'
import NiceModal from '@ebay/nice-modal-react'
import { store } from './store'
import { Provider } from 'react-redux'
import { Toaster } from '@/components/ui/sonner'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <Toaster position='top-center' richColors />
      <NiceModal.Provider>
        <div>{children}</div>
      </NiceModal.Provider>
    </Provider>
  )
}
