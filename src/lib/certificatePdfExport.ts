import QRCode from "qrcode";

/** Capture only the artwork, independent of the page theme, scroll and viewport. */
export async function exportCertificatePdf(artwork: HTMLElement, filename: string) {
  const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
    import("html2canvas"), import("jspdf"),
  ]);
  await document.fonts.ready;
  const host = document.createElement("div");
  host.style.cssText = "position:fixed;left:-100000px;top:0;width:1120px;pointer-events:none;";
  const clone = artwork.cloneNode(true) as HTMLElement;
  clone.classList.add("certificate-canvas--export");
  const styles = getComputedStyle(artwork);
  for (const token of ["paper", "ink", "emerald", "blue", "line"]) {
    clone.style.setProperty(`--certificate-${token}`, styles.getPropertyValue(`--certificate-${token}`));
  }
  host.append(clone);
  document.body.append(host);
  try {
    await Promise.all(Array.from(clone.querySelectorAll("img")).map(async image => {
      const qrValue = image.dataset.qrValue;
      if (qrValue) {
        image.src = await QRCode.toDataURL(qrValue, { width: 320, margin: 4, errorCorrectionLevel: "M" });
      } else if (!image.src.startsWith("data:")) {
        image.crossOrigin = "anonymous";
        await image.decode();
        const bitmap = document.createElement("canvas");
        bitmap.width = image.naturalWidth;
        bitmap.height = image.naturalHeight;
        const context = bitmap.getContext("2d");
        if (!context || !bitmap.width) throw new Error("Could not load certificate image. Please retry.");
        context.drawImage(image, 0, 0);
        image.src = bitmap.toDataURL("image/png");
      }
      await image.decode();
      if (!image.naturalWidth) throw new Error("Certificate image is missing");
    }));
    const bounds = clone.getBoundingClientRect();
    const canvas = await html2canvas(clone, {
      scale: 2, backgroundColor: styles.backgroundColor, useCORS: true, logging: false,
      width: Math.ceil(bounds.width), height: Math.ceil(bounds.height),
      windowWidth: 1280, windowHeight: 1800, scrollX: 0, scrollY: 0,
      onclone: (_document, element) => {
        element.style.position = "fixed";
        element.style.left = "0";
        element.style.top = "0";
        element.style.margin = "0";
        element.style.transform = "none";
      },
    });
    const width = 297;
    const height = width * canvas.height / canvas.width;
    const pdf = new jsPDF({ orientation: width >= height ? "landscape" : "portrait", unit: "mm", format: [width, height] });
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
    pdf.save(filename);
  } finally {
    host.remove();
  }
}