import { jsPDF } from "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.0.0/jspdf.es.js";

class GeneratePDF {
  constructor(domRefId) {
    this.pdfDoc = new jsPDF();
    this.position = { x: 10, y: 20 };
    this.margin = { x: 10, y: 10 };
    this.domRef = domRefId ? document.querySelector(`#${domRefId}`) : null;
  }

  downloadPDF(filename) {
    this.pdfDoc.save(filename);
  }

  getPDFURL() {
    return this.pdfDoc.output("bloburl");
  }

  addHeader(text) {
    this.pdfDoc.setFontSize(28);
    this.pdfDoc.text(text, 105, this.position.y, { align: "center" });
    this.position.y += 20;
    this.pdfDoc.setTextColor(107, 130, 201);
    
  }

  addFieldValue(label, value) {
    this.pdfDoc.setFontSize(12);
    this.pdfDoc.setFont("helvetica", "bold");
    this.pdfDoc.text(`${label}:`, this.margin.x, this.position.y);
    this.pdfDoc.setFont("helvetica", "normal");
    this.pdfDoc.setTextColor(107, 130, 201); 
    this.pdfDoc.text(String(value), this.margin.x + 40, this.position.y);
    this.position.y += 8;
  }

  addDescription(desc) {
    const cardWidth = 180;
    const cardPadding = 8;
    const titleHeight = 12;
    const descFontSize = 11;

    const startX = this.margin.x;
    const startY = this.position.y + 5;

  
    const lines = this.pdfDoc.splitTextToSize(desc, cardWidth - (cardPadding * 2));
    const textHeight = lines.length * 6;
    const cardHeight = titleHeight + textHeight + (cardPadding * 2);

    
    this.pdfDoc.setFillColor(209, 245, 255); 
    this.roundedRect(startX - 2, startY - 2, cardWidth + 4, cardHeight + 4, 5, 'F');


    this.pdfDoc.setFillColor(107, 130, 201);
    this.roundedRect(startX, startY, cardWidth, titleHeight, 5, 'F');
    this.pdfDoc.setFontSize(12);
    this.pdfDoc.setTextColor(255, 255, 255); 
    this.pdfDoc.setFont("helvetica", "bold");
    this.pdfDoc.text("Description", startX + cardPadding, startY + 8);
    this.pdfDoc.setFontSize(descFontSize);
    this.pdfDoc.setTextColor(50, 50, 50); 
    this.pdfDoc.setFont("helvetica", "normal");
    this.pdfDoc.text(
      lines,
      startX + cardPadding,
      startY + titleHeight + cardPadding
    );

    this.position.y = startY + cardHeight + 8;
  }

  roundedRect(x, y, w, h, r, style) {
    const pdf = this.pdfDoc;
    pdf.roundedRect(x, y, w, h, r, r, style);
  }

  reset() {
    this.pdfDoc = new jsPDF();
    this.position = { x: 10, y: 20 };
  }

  generateJobPDF(job) {
    this.reset();
    this.addHeader("OddJobs Job Details");
    this.addFieldValue("Title", job.title);
    this.addFieldValue("Category", job.category);
    this.addFieldValue("Salary", `$${job.salary}`);
    this.addFieldValue("Skills", job.skills);
    this.addDescription(job.description);
    return this;
  }

  show() {
    if (this.domRef) {
      this.domRef.src = this.getPDFURL();
    }
  }
}

const myPDF = new GeneratePDF("pdf-preview");
const jobSelect = document.querySelector("#job-select");
const viewBtn = document.querySelector("#view");
const downloadBtn = document.querySelector("#download");
const btns = document.querySelectorAll(".btns");

async function fetchJobs() {
  try {
    const res = await fetch("/api/jobs");
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function fetchJobById(id) {
  try {
    const res = await fetch(`/api/jobs/${id}`);
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function initPDF() {
  const jobs = await fetchJobs();
  jobs.forEach((job) => {
    const opt = document.createElement("option");
    opt.value = job.id;
    opt.textContent = job.title;
    jobSelect.appendChild(opt);
  });
}

jobSelect.addEventListener("change", () => {
  const show = jobSelect.value;
  btns.forEach((btn) => (btn.style.display = show ? "flex" : "none"));
});

viewBtn.addEventListener("click", async () => {
  const id = jobSelect.value;
  if (!id) return;
  const job = await fetchJobById(id);
  if (job) myPDF.generateJobPDF(job).show();
});

downloadBtn.addEventListener("click", async () => {
  const id = jobSelect.value;
  if (!id) return;
  const job = await fetchJobById(id);
  if (job) {
    myPDF.generateJobPDF(job).downloadPDF(`OddJobs-Job-${job.title}-Details.pdf`);
  }
});

initPDF();
