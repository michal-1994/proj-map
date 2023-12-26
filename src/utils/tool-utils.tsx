import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Map } from 'ol';
// import { getPointResolution } from 'ol/proj.js';

import { DMIS } from '../constants';
import { PrintData } from '../models';

export const toggleHighContrast = () => {
    document.getElementsByTagName('html')[0].classList.toggle('high-contrast');
};

export const exportToPDF = (formData: PrintData, map: Map) => {
    const pageSize: string = formData.pageSize.split('-')[0];
    const orientation: any = formData.pageSize.split('-')[1];
    const dim: number[] = (DMIS as any)[pageSize];

    // const resolution: number = +formData.resolution;
    // const scale: number = +formData.scale;

    // const width = Math.round((dim[0] * resolution) / 25.4);
    // const height = Math.round((dim[1] * resolution) / 25.4);

    // const viewResolution = map.getView().getResolution();
    // const scaleResolution =
    //     scale /
    //     getPointResolution(
    //         map.getView().getProjection(),
    //         resolution / 25.4,
    //         map.getView().getCenter()!
    //     );

    if (orientation === 'portrait') {
        dim.reverse();
    }

    html2canvas(map.getViewport()).then(function (canvas) {
        const pdf = new jsPDF(orientation, undefined, dim);
        pdf.addImage(
            canvas.toDataURL('image/jpeg'),
            'JPEG',
            0,
            0,
            dim[0],
            dim[1]
        );
        pdf.save('map.pdf');
    });
};
