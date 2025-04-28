const baseUrl = window.location.origin + "/api";

async function getJobs() {
  try {
    const jobResp = await fetch(`${baseUrl}/jobs`);
    const jobData = await jobResp.json();
    document.querySelector(".joblistings-wrapper").innerHTML = "";
    jobData.forEach(function (job) {
      document.querySelector(".joblistings-wrapper").innerHTML += `
  <div class="joblisting">
   <h4><a href="../job-details/${job.id}">${job.title}</a></h4>
    <p>${job.category}</p>
    <div class="job-btns">
      <button class="add-job-btn" title="Edit Job" onclick="window.location.href='../api/update/${job.id}'"><i class="fa-solid fa-pen-to-square"></i></button>
      <button class="delete-job-btn" title="Remove Job" onclick="window.location.href='./remove/${job.id}'"><i class="fa-solid fa-trash"></i></button>
    </div>
  </div>
`;
    });
  } catch (e) {
    console.warn("There was an error!!!", e);
  }
}

getJobs();
