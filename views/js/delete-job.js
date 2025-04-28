const baseUrl = window.location.origin;

const jobId = window.location.pathname.split("/").pop();

document.getElementById("confirmDelete").addEventListener("click", async () => {
  try {
    const resp = await fetch(`${baseUrl}/api/remove/${jobId}`, {
      method: "DELETE",
    });

    if (resp.ok) {
      alert("Job deleted.");
      window.location.href = "../../jobs/";
    } else {
      alert("Failed to delete job.");
    }
  } catch (err) {
    console.error("Error deleting job", err);
  }
});