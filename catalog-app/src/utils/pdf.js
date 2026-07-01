import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export async function exportToPDF(elementId = 'catalog-preview') {
  const el = document.getElementById(elementId);
  if (!el) return;

  const canvas = await html2canvas(el, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    backgroundColor: null,
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();

  const imgProps = pdf.getImageProperties(imgData);
  const ratio = imgProps.width / imgProps.height;
  const pdfH = pageW / ratio;

  let posY = 0;
  let remaining = pdfH;

  while (remaining > 0) {
    pdf.addImage(imgData, 'PNG', 0, posY, pageW, pdfH);
    remaining -= pageH;
    posY -= pageH;
    if (remaining > 0) pdf.addPage();
  }

  pdf.save('catalog.pdf');
}

export function exportToHTML(elementId = 'catalog-preview') {
  const el = document.getElementById(elementId);
  if (!el) return;
  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8">
<title>Каталог</title>
<style>body{margin:0;padding:0;}</style></head>
<body>${el.outerHTML}</body></html>`;
  const blob = new Blob([html], { type: 'text/html' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'catalog.html';
  a.click();
}
