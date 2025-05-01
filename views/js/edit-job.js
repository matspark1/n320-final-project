const baseUrl = window.location.origin;

const id = window.location.pathname.split("/").pop();
console.log("Job ID:", id);

async function loadJob() {
  try {
    const resp = await fetch(`${baseUrl}/api/update/edit/${id}`);
    if (!resp.ok) {
      throw new Error("Job not found");
    }

    const job = await resp.json();

    document.getElementById("title").value = job.title || "No title available";
    document.getElementById("description").value =
      job.description || "No description available";
    document.getElementById("salary").value = job.salary || "Not available";
    document.getElementById("skills").value =
      job.skills || "No skills available";
    document.getElementById("category").value =
      job.category || "No category available";
  } catch (err) {
    console.error("Error loading job:", err);
    alert("Failed to load job details.");
  }
}

loadJob();

document.getElementById("editJobForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = e.target.title.value;
  const description = e.target.description.value;
  const salary = e.target.salary.value;
  const skills = e.target.skills.value;
  const category = e.target.category.value;

  try {
    const resp = await fetch(`${baseUrl}/api/update/edit/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        salary,
        skills,
        category
      }),
    });

    if (resp.ok) {
      alert("Job updated successfully!");
      window.location.href = "../../jobs/";
    } else {
      const errorData = await resp.json();
      alert(`Error updating job: ${errorData.error || "Unknown error"}`);
    }
  } catch (err) {
    console.error("Error updating job:", err);
    alert("Failed to update job.");
  }
});


