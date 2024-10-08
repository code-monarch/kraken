'use client'
import { ReactElement } from 'react'
import { usePathname } from 'next/navigation'
import NavLink from '../molecules/navigation/sidebar-nav-link'
import { DASHBOARD_PATHS } from '@/lib/routes'
import { OverviewNavIcon } from '../atoms/icons/sidebar-nav/overview-nav-icon'
import { UserManagementNavIcon } from '../atoms/icons/sidebar-nav/user-management-nav-icon'
import { TransactionsNavIcon } from '../atoms/icons/sidebar-nav/transactions-nav-icon'
import { SettingsNavIcon } from '../atoms/icons/sidebar-nav/settings-nav-icon'
import { ActivityLogsNavIcon } from '../atoms/icons/sidebar-nav/activity-logs-nav-icon'
import SignOutButton from '../molecules/navigation/sign-out-button'
import { CashOutRequestNavIcon } from '../atoms/icons/sidebar-nav/cash-out-request-nav-icon'
import CashOutRequestCountWidget from '@/pattern/cashout-request/atoms/cash-out-request-count-widget'
import { ExchangeRateNavIcon } from '../atoms/icons/sidebar-nav/exchange-rate-nav-icon'

const navigation: {
  name: string
  href: string
  icon: ReactElement
}[] = [
  {
    name: 'Overview',
    href: `${DASHBOARD_PATHS.index}`,
    icon: <OverviewNavIcon />,
  },
  {
    name: 'User Management',
    href: `${DASHBOARD_PATHS.userManagement}`,
    icon: <UserManagementNavIcon />,
  },
  {
    name: 'Cash-out request',
    href: `${DASHBOARD_PATHS.cashOutRequest}`,
    icon: <CashOutRequestNavIcon />,
  },
  {
    name: 'Transactions',
    href: `${DASHBOARD_PATHS.transactions}`,
    icon: <TransactionsNavIcon />,
  },
  {
    name: 'Exchange Rates',
    href: `${DASHBOARD_PATHS.exchangeRates}`,
    icon: <ExchangeRateNavIcon />,
  },
  {
    name: 'Settings',
    href: `${DASHBOARD_PATHS.settings}`,
    icon: <SettingsNavIcon />,
  },
  {
    name: 'Activity Logs',
    href: `${DASHBOARD_PATHS.activityLogs}`,
    icon: <ActivityLogsNavIcon />,
  },
]

const Sidebar = () => {
  const pathname = usePathname()
  const isCashoutRouteActive = pathname.startsWith(
    DASHBOARD_PATHS.cashOutRequest,
  )
  return (
    <div className='fixed left-0 top-0 bottom-0 bg-background h-[calc(var(100vh-(--topbar-height)))] w-[--sidebar-width] flex flex-col justify-between border-t-[1.5px] border-t-border px-4 py-[32px] mt-[--topbar-height] z-30'>
      <div className='w-full flex flex-col gap-y-2 items-center custom_scollbar'>
        {navigation.map((nav, idx) => (
          <NavLink
            href={nav.href}
            exact={nav.href === '/' ? true : false}
            key={idx}
          >
            <span>{nav.icon}</span>
            <span>{nav.name}</span>

            {/* Amount of Cash out Request */}
            {nav.name === 'Cash-out request' && (
              <CashOutRequestCountWidget
                variant={isCashoutRouteActive ? 'active' : 'default'}
              />
            )}
          </NavLink>
        ))}
      </div>
      {/* Sign out */}
      <SignOutButton />
    </div>
  )
}

export default Sidebar
