/** Fixed-width, light artwork export; never capture admin tools or private meeting links. */
export async function exportScheduleImage(artwork: HTMLElement, filename: string, format: "png" | "pdf" = "png") {
  const { default: html2canvas } = await import("html2canvas");
  await document.fonts.ready;
  const host = document.createElement("div");
  host.className = "schedule-export-host";
  const clone = artwork.cloneNode(true) as HTMLElement;
  clone.classList.add("teaching-poster--export");
  host.append(clone);
  document.body.append(host);
  try {
    await Promise.all(Array.from(clone.querySelectorAll("img")).map(async image => {
      image.crossOrigin = "anonymous";
      await image.decode();
      const bitmap = document.createElement("canvas");
      bitmap.width = image.naturalWidth;
      bitmap.height = image.naturalHeight;
      const context = bitmap.getContext("2d");
      if (!context || !bitmap.width) throw new Error("Logo unavailable");
      context.drawImage(image, 0, 0);
      image.src = bitmap.toDataURL("image/png");
      await image.decode();
    }));
    const bounds = clone.getBoundingClientRect();
    const canvas = await html2canvas(clone, {
      scale: 2, backgroundColor: getComputedStyle(clone).backgroundColor,
      useCORS: true, logging: false, width: Math.ceil(bounds.width), height: Math.ceil(bounds.height),
      windowWidth: 1280, windowHeight: 1800, scrollX: 0, scrollY: 0,
      onclone: (_doc, element) => {
        element.style.position = "fixed";
        element.style.left = "0";
        element.style.top = "0";
        element.style.margin = "0";
      },
    });
    if (format === "pdf") {
      const { default: jsPDF } = await import("jspdf");
      const width = 210;
      const pageHeight = 297;
      const height = Math.max(pageHeight, width * canvas.height / canvas.width);
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: [width, height] });
      const imageHeight = width * canvas.height / canvas.width;
      pdf.addImage(canvas.toDataURL("image/jpeg", 0.95), "JPEG", 0, (height - imageHeight) / 2, width, imageHeight);
      pdf.save(filename);
      return;
    }
    const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob(value => value ? resolve(value) : reject(new Error("Image export failed")), "image/png"));
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  } finally {
    host.remove();
  }
}