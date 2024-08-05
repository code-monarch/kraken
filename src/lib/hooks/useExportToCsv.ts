import { useCallback } from 'react';

import FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { toast } from 'sonner';

interface IProps {
    dataToExport: any;
    fileName: string;
}

export const useExportToCsv = ({ dataToExport, fileName }: IProps) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xls';

    async function exportFile() {
        try {
            let result = await new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (dataToExport) {
                        const ws = XLSX.utils.json_to_sheet(dataToExport);
                        const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
                        const excelBuffer = XLSX.write(wb, { bookType: 'xls', type: 'array' });
                        const data = new Blob([excelBuffer], { type: fileType });
                        FileSaver.saveAs(data, fileName + fileExtension);

                        resolve("Export successful");
                    }
                    else {
                        reject("Error exporting file");
                        toast.error('Unexpected error', {
                            description: `${'Error exporting file'}`,
                            id: 'error-exporting',
                            duration: 5000,
                            cancel: {
                                label: 'Close',
                            },
                        })
                    }
                }, 2000); // Simulates a 2-second delay
            });
            return result;
        }
        catch (error) {
            return `Error:  ${error}`;
        }
    }

    return [exportFile];
};
