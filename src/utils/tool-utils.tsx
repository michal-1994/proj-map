import { Map } from 'ol';
import { ScaleLine } from 'ol/control';
import { getPointResolution, get as getProjection } from 'ol/proj.js';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

import { DMIS } from '../constants';

import { PrintData } from '../models';

export const toggleHighContrast = () => {
    document.getElementsByTagName('html')[0].classList.toggle('high-contrast');
};

export const togglePrintTool = () => {
    document.getElementById('map-print')?.classList.toggle('open');
};

export const exportToPDF = (formData: PrintData, map: Map) => {
    const pageSize: string = formData.pageSize;
    const resolution: number = +formData.resolution;
    const scale: number = +formData.scale;

    const dim: number[] = (DMIS as any)[pageSize];
    const width = Math.round((dim[0] * resolution) / 25.4);
    const height = Math.round((dim[1] * resolution) / 25.4);

    // const scaleLine = new ScaleLine({bar: true, text: true, minWidth: 125});
    // map.addControl(scaleLine);

    const viewResolution = map.getView().getResolution();
    const scaleResolution =
        scale /
        getPointResolution(
            map.getView().getProjection(),
            resolution / 25.4,
            map.getView().getCenter()!
        );

    html2canvas(map.getViewport()).then(function (canvas) {
        const pdf = new jsPDF('landscape', undefined, dim);
        pdf.addImage(
            canvas.toDataURL('image/jpeg'),
            'JPEG',
            0,
            0,
            dim[0],
            dim[1]
        );
        pdf.save('map.pdf');

        // Reset original map size
        // scaleLine.setDpi(undefined);
        // map.getTargetElement().style.width = width + 'px';
        // map.getTargetElement().style.height = height + 'px';
        // map.updateSize();
        // map.getView().setResolution(scaleResolution);
    });

    // Set print size
    // scaleLine.setDpi(resolution);
    // map.getTargetElement().style.width = width + 'px';
    // map.getTargetElement().style.height = height + 'px';
    // map.updateSize();
    // map.getView().setResolution(scaleResolution);
};
