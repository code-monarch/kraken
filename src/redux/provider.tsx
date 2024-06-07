import NiceModal from '@ebay/nice-modal-react'
import { persistor, store } from './store'
import { Provider } from 'react-redux'
import { Toaster } from '@/components/ui/sonner'
import { PersistGate } from 'redux-persist/integration/react'
import { injectStore } from '@/lib/helper/logout'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  injectStore(store)

  return (
    <div>
      <Provider store={store}>
        <Toaster position='top-center' richColors />
        <NiceModal.Provider>
          <PersistGate persistor={persistor}>{children}</PersistGate>
        </NiceModal.Provider>
      </Provider>
    </div>
  )
}
