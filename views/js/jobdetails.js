const baseUrl = window.location.origin + "/api";

async function getJobDetails() {
  try {
    const pathParts = window.location.pathname.split("/");
    const jobId = pathParts[pathParts.length - 1];

    const jobResp = await fetch(`${baseUrl}/jobs/${jobId}`);

    const job = await jobResp.json();

    document.querySelector("#jobDetails").innerHTML = `
      <div class="jobdetails">
        <button class="back-btn" title="Back to Jobs" onclick="window.location.href='../jobs/'">
        <i class="fa-solid fa-arrow-left"></i>
        </button>
        <h2>${job.title}</h2>
        <p><strong>Description:</strong> ${job.description}</p>
        <p><strong>Category:</strong> ${job.category}</p>
        <p><strong>Salary:</strong> $${job.salary}</p>
        <p><strong>Skills Needed:</strong> ${job.skills}</p>
        <button class="edit-btn2" title="Edit Job" onclick="window.location.href='../edit-job/${job.id}'">
        <i class="fa-solid fa-pen-to-square"></i>
        </button>
      </div>
    `;
  } catch (e) {
    console.error(e);
    document.querySelector("#jobDetails").innerHTML = `
      <div class="error">
        <h2>Error loading job details</h2>
        <p>Please try again later.</p>
        <button onclick="window.location.href='../jobs/'">Back to Jobs</button>
      </div>
    `;
  }
}

getJobDetails();
