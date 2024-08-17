'use client'
import React, { useEffect, useState } from 'react'
import ButtonWithIcon from '@/pattern/common/molecules/controls/button-with-icon'
import SearchInput from '@/pattern/common/molecules/inputs/search-input'
import FilterIcon from '@/pattern/common/atoms/icons/filter-icon'
import { show } from '@ebay/nice-modal-react'
import { UserManagementTableSearchFilterModal } from '../organisms/user-management-table-search-filter-modal'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PaginationState } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  useGetUsersMetricsQuery,
} from '@/redux/services/users/user-metrics.api-alice'
import AllUsersTab from '../organisms/tabs/all-users-tab'
import UsersTab from '../organisms/tabs/users-tab'
import AgentsTab from '../organisms/tabs/agents-tab'
import UserManagementTemplateHeader from '../organisms/user-management-template-header'

const UserManagementTableTemplate = () => {
  const [tabValue, setTabValue] = useState('all')
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const [status, setStatus] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [order, setOrder] = useState<string>('')
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')

  const {
    data: userMetricsData
  } = useGetUsersMetricsQuery({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    status: status,
    startDate: startDate,
    endDate: endDate,
    q: searchQuery,
  })

  const handleShowSearchFilterModal = async () => {
    const result: any = await show(UserManagementTableSearchFilterModal)
    if (result.resolved) {
      setStatus(result.userStatus)
      setOrder(result.order)
      setStartDate(result.startDate)
      setEndDate(result.endDate)
    }
  }

  useEffect(() => {
    if (searchQuery) {
      // Reset pagination and PageCount
      setPagination({ pageIndex: 0, pageSize: 10 })
    }
  }, [searchQuery, setPagination])

  return (
    <div className='w-full h-fit bg-card px-6 overflow-auto'>
      {/* Top */}
      <UserManagementTemplateHeader />

      {/* Bottom */}
      <div className='!relative w-full h-fit bg-inherit flex items-center py-[26px] overflow-auto'>
        {/* Tabs */}
        <Tabs value={tabValue} onValueChange={setTabValue} className='w-full'>
          <TabsList>
            {/* All Users */}
            <div className='w-fit flex flex-col items-start'>
              <TabsTrigger
                value='all'
                className='rounded-none text-base py-3 px-6'
              >
                All
              </TabsTrigger>
              <Separator
                className={
                  tabValue === 'all'
                    ? 'text-primary bg-primary'
                    : 'text-border bg-border'
                }
              />
            </div>

            {/* Pilgrims */}
            <div className='w-fit flex flex-col items-start'>
              <TabsTrigger
                value='user'
                className='rounded-none text-base py-3 px-6'
              >
                User
                <Badge variant='accent'>
                  {userMetricsData?.data.users.total ?? 0}
                </Badge>
              </TabsTrigger>
              <Separator
                className={
                  tabValue === 'user'
                    ? 'text-primary bg-primary'
                    : 'text-border bg-border'
                }
              />
            </div>

            {/* Agent */}
            <div className='w-fit flex flex-col items-start'>
              <TabsTrigger
                value='agent'
                className='rounded-none text-base py-3 px-6'
              >
                Agent
                <Badge variant='accent'>
                  {userMetricsData?.data.agents.total ?? 0}
                </Badge>
              </TabsTrigger>
              <Separator
                className={
                  tabValue === 'agent'
                    ? 'text-primary bg-primary'
                    : 'text-border bg-border'
                }
              />
            </div>
          </TabsList>

          <TabsContent value='all'>
            <AllUsersTab
              status={status}
              startDate={startDate}
              endDate={endDate}
              searchQuery={searchQuery}
              order={order}
            />
          </TabsContent>

          {/* Users */}
          <TabsContent value='user'>
            <UsersTab
              status={status}
              startDate={startDate}
              endDate={endDate}
              searchQuery={searchQuery}
              order={order}
            />
          </TabsContent>

          {/* Agents */}
          <TabsContent value='agent'>
            <AgentsTab
              status={status}
              startDate={startDate}
              endDate={endDate}
              searchQuery={searchQuery}
              order={order}
            />
          </TabsContent>
        </Tabs>
        {/* Tabs End */}

        {/* Search Input and Filter */}
        <div className='absolute top-[30px] right-0 w-fit flex items-center gap-3'>
          <SearchInput
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder='Search name, email or phone number'
          />

          {/* Filter Button */}
          <ButtonWithIcon
            prefixIcon={<FilterIcon />}
            variant='outline'
            size='sm'
            className='w-[125px] h-[44px] text-base'
            onClick={handleShowSearchFilterModal}
          >
            Filters
          </ButtonWithIcon>
        </div>
      </div>
    </div>
  )
}

export default UserManagementTableTemplate