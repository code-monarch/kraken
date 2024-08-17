import React, { FC } from 'react'
import LoadingButton from '../molecules/controls/loading-button'
import { ExcelIcon } from './icons/excel-icon'
import { cn } from '@/lib/utils'

interface IExportButtonProps {
    className?: string,
    disabled?: boolean,
    loading: boolean,
    onClick: () => void
}

export const ExportButton: FC<IExportButtonProps> = ({ className, disabled = false, loading, onClick }) => {
    return (
        <>
            <LoadingButton
                type="button"
                variant={loading ? "default" : 'outlinePrimary'}
                size='sm'
                className={cn('w-[127px] h-[44px] flex items-center cursor-pointer disabled:cursor-not-allowed', className)}
                disabled={disabled}
                loading={loading}
                onClick={onClick}
            >
                <ExcelIcon />
                <span className='text-base'>
                    Export
                </span>
            </LoadingButton>
        </>
    )
}