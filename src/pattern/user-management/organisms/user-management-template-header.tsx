import React from 'react'
import { useLazyGetUsersMetricsForExportQuery } from '@/redux/services/users/user-metrics.api-alice'
import { useExportToCsv } from '@/lib/hooks/useExportToCsv'
import { toast } from 'sonner'
import { ExportButton } from '@/pattern/common/atoms/export-button'

const UserManagementTemplateHeader = () => {
    const [exportUsersData, {
        data: exportData,
        isLoading,
        isError,
        isFetching,
    }] = useLazyGetUsersMetricsForExportQuery()

    const [exportFile] = useExportToCsv({
        dataToExport: exportData?.data?.results,
        fileName: 'UmrahCash Users Report',
    })
    const handleExportFile = () => {
        exportUsersData({}).unwrap().then((res) => {
            if (exportData?.data?.results) {
                exportFile()
            }
        }).catch(() => toast.error('Could not export', {
            description: `${'No data available for export'}`,
            id: 'error-exporting',
            duration: 5000,
            cancel: {
                onClick: () => { },
                label: 'Close',
            },
        }))
    }

    return (
        <div className='w-full h-[76px] bg-inherit flex items-center justify-between py-[26px]'>
            <div className='flex items-center gap-2'>
                <h3 className='text-[1.125rem] font-semibold'>User List</h3>
            </div>
            <ExportButton
                disabled={isLoading || isFetching || isError}
                loading={isLoading}
                onClick={handleExportFile}
            />
        </div>
    )
}

export default UserManagementTemplateHeader