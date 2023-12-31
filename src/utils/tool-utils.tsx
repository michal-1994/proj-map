import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
// import { getPointResolution } from 'ol/proj.js';

export const toggleHighContrast = () => {
    document.getElementsByTagName('html')[0].classList.toggle('high-contrast');
};

export const exportToPDF = (config: any) => {
    if (config.map && config.width && config.height && config.overviewExtent) {
        document.body.style.cursor = 'progress';
        const originalExtent = config.map
            .getView()
            .calculateExtent(config.map.getSize());

        config.map.getView().fit(config.overviewExtent, config.map.getSize());

        // const viewResolution = config.map.getView().getResolution();
        // const scaleResolution =
        //     +config.scale /
        //     getPointResolution(
        //         config.map.getView().getProjection(),
        //         +config.resolution / 25.4,
        //         config.map.getView().getCenter()!
        //     );

        setTimeout(() => {
            html2canvas(config.map.getViewport()).then(canvas => {
                const pdf = new jsPDF({
                    orientation: config.orientation,
                    unit: 'mm',
                    format: [config.width, config.height]
                });

                pdf.addImage(
                    canvas.toDataURL('image/png'),
                    'JPEG',
                    0,
                    0,
                    config.width,
                    config.height
                );

                config.map.getView().fit(originalExtent, config.map.getSize());

                // Save
                // pdf.save('map.pdf');

                // Open in new window
                const pdfBlob = pdf.output('blob');
                const pdfUrl = URL.createObjectURL(pdfBlob);
                window.open(pdfUrl, '_blank');

                document.body.style.cursor = 'auto';
            });
        }, 2000);
    }
};
