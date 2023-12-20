import { DMIS } from '../constants';

import { PrintData } from '../models';

export const toggleHighContrast = () => {
    document.getElementsByTagName('html')[0].classList.toggle('high-contrast');
};

export const togglePrintTool = () => {
    document.getElementById('map-print')?.classList.toggle('open');
};

export const exportToPDF = (formData: PrintData) => {
    const pageSize: string = formData.pageSize;
    const resolution: number = +formData.resolution;
    const scale: number = +formData.scale;

    const dim: number[] = (DMIS as any)[pageSize];
    const width = Math.round((dim[0] * resolution) / 25.4);
    const height = Math.round((dim[1] * resolution) / 25.4);
};
