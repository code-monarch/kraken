import React from 'react'
import { ExcelIcon } from '@/pattern/common/atoms/icons/excel-icon'
import ButtonWithIcon from '@/pattern/common/molecules/controls/button-with-icon'
import { useGetUsersMetricsForExportQuery } from '@/redux/services/users/user-metrics.api-alice'
import { useExportToCsv } from '@/lib/hooks/useExportToCsv'
import { toast } from 'sonner'

const UserManagementTemplateHeader = () => {
    const {
        data: exportData,
        isLoading: loadingExportData,
        isError: errorLoadingExportData,
        isFetching: fetchingExportData,
    } = useGetUsersMetricsForExportQuery({})

    const [exportFile] = useExportToCsv({
        dataToExport: exportData?.data?.results,
        fileName: 'UmrahCash Users Report',
    })

    const handleExportFile = () => {
        if (exportData?.data?.results) {
            exportFile()
        } else {
            toast.error('Could not export', {
                description: `${'No data available for export'}`,
                id: 'error-exporting',
                duration: 5000,
                cancel: {
                    onClick: () => { },
                    label: 'Close',
                },
            })
        }
    }

    return (
        <div className='w-full h-[76px] bg-inherit flex items-center justify-between py-[26px]'>
            <div className='flex items-center gap-2'>
                <h3 className='text-[1.125rem] font-semibold'>User List</h3>
            </div>
            <ButtonWithIcon
                variant='outlinePrimary'
                prefixIcon={<ExcelIcon />}
                size='sm'
                className='w-[127px] h-[44px] text-base disabled:cursor-not-allowed'
                disabled={
                    loadingExportData || errorLoadingExportData || fetchingExportData
                }
                onClick={handleExportFile}
            >
                Export
            </ButtonWithIcon>
        </div>
    )
}

export default UserManagementTemplateHeader