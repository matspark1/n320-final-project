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
  }

  addFieldValue(label, value) {
    this.pdfDoc.setFontSize(12);
    this.pdfDoc.setFont("helvetica", "bold");
    this.pdfDoc.text(`${label}:`, this.margin.x, this.position.y);
    this.pdfDoc.setFont("helvetica", "normal");
    this.pdfDoc.text(String(value), this.margin.x + 40, this.position.y);
    this.position.y += 8;
  }

  addDescription(desc) {
    this.position.y += 5;
    this.pdfDoc.setFont("helvetica", "bold");
    this.pdfDoc.text("Description:", this.margin.x, this.position.y);
    this.position.y += 8;
    this.pdfDoc.setFont("helvetica", "normal");
    const lines = this.pdfDoc.splitTextToSize(desc, 180);
    this.pdfDoc.text(lines, this.margin.x, this.position.y);
    this.position.y += lines.length * 7;
  }

  reset() {
    this.pdfDoc = new jsPDF();
    this.position = { x: 10, y: 20 };
    // border removed: no addBackground() call
  }

  generateJobPDF(job) {
    this.reset();
    this.addHeader("OddJobs Job Details");
    // Job ID removed
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