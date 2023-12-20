export const toggleHighContrast = () => {
    document.getElementsByTagName('html')[0].classList.toggle('high-contrast');
};

export const togglePrintTool = () => {
    document.getElementById('map-print')?.classList.toggle('open');
};
